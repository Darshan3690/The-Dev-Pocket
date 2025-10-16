"use client";

import React, { useMemo, useState } from "react";
import { Calendar as RBCalendar, dateFnsLocalizer, Views, SlotInfo, Event as RBCEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, add, isSameDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Locale } from "date-fns";

export interface CalendarEvent {
	id: string;
	title: string;
	start: Date;
	end: Date;
	allDay?: boolean;
}

const locales: Record<string, Locale> = {};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 0 }), // Sunday start
	getDay,
	locales,
});

function uid(prefix = "") {
	return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

function combineDateWithTime(date: Date, timeStr: string) {
	const [hh = "0", mm = "0"] = timeStr.split(":");
	const d = new Date(date);
	d.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
	return d;
}

export default function CalendarView(): React.JSX.Element {
	// sample temporary events
	const [events, setEvents] = useState<CalendarEvent[]>(() => {
		const today = new Date();
		return [
			{
				id: "e1",
				title: "Read HTML5 guide",
				start: add(today, { days: 1, hours: 9 }),
				end: add(today, { days: 1, hours: 10 }),
			},
			{
				id: "e2",
				title: "Practice Flexbox",
				start: add(today, { days: 3, hours: 14 }),
				end: add(today, { days: 3, hours: 16 }),
			},
			{
				id: "e3",
				title: "JS closures exercises",
				start: add(today, { days: 5, hours: 18 }),
				end: add(today, { days: 5, hours: 19, minutes: 30 }),
			},
			{
				id: "e4",
				title: "Build React todo",
				start: add(today, { days: 7, hours: 11 }),
				end: add(today, { days: 7, hours: 14 }),
			},
			{
				id: "e5",
				title: "Write tests for utils",
				start: add(today, { days: -2, hours: 10 }),
				end: add(today, { days: -2, hours: 11, minutes: 30 }),
			},
		];
	});

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);

	const [titleInput, setTitleInput] = useState("");
	const [startTimeInput, setStartTimeInput] = useState<string>("09:00");
	const [endTimeInput, setEndTimeInput] = useState<string>("10:00");
	const [allDayInput, setAllDayInput] = useState(false);

	// handle clicking/selecting a slot (day or time range)
	function handleSelectSlot(slotInfo: SlotInfo) {
		const { start, end } = slotInfo;
		setSelectedDate(start);
		setSelectedRange({ start, end });
		setStartTimeInput(format(start, "HH:mm"));
		setEndTimeInput(format(end ?? add(start, { hours: 1 }), "HH:mm"));
		setAllDayInput(false);
		setTitleInput("");
		setModalOpen(true);
	}

	// show events for the selected date
	const eventsForSelectedDay = useMemo(() => {
		if (!selectedDate) return [];
		return events.filter((ev) => isSameDay(ev.start, selectedDate));
	}, [events, selectedDate]);

	// create event
	function handleCreateEvent(e?: React.FormEvent) {
		if (e) e.preventDefault();
		if (!selectedDate) return;

		const start =
			allDayInput || !startTimeInput ? new Date(selectedDate) : combineDateWithTime(selectedDate, startTimeInput);
		const end =
			allDayInput || !endTimeInput
				? new Date(start.getTime() + 60 * 60 * 1000)
				: combineDateWithTime(selectedDate, endTimeInput);

		if (end <= start) {
			alert("End time must be after start time.");
			return;
		}

		const newEvent: CalendarEvent = {
			id: uid("evt_"),
			title: titleInput || "Untitled",
			start,
			end,
			allDay: allDayInput,
		};

		setEvents((prev) => [...prev, newEvent]);
		setTitleInput("");
		setModalOpen(false);
	}

	// delete event
	function handleDeleteEvent(id: string) {
		setEvents((prev) => prev.filter((ev) => ev.id !== id));
	}

	// click an existing event -> open modal prefilled
	function handleSelectEvent(event: RBCEvent) {
		const ev = event as CalendarEvent;
		setSelectedDate(ev.start);
		setSelectedRange({ start: ev.start, end: ev.end });
		setTitleInput(ev.title);
		setStartTimeInput(format(ev.start, "HH:mm"));
		setEndTimeInput(format(ev.end, "HH:mm"));
		setAllDayInput(Boolean(ev.allDay));
		setModalOpen(true);
	}

	return (
		<div className="p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold">My Calendar</h2>
				<div className="text-sm text-gray-500">Click a day or drag to select a time range</div>
			</div>

			<div className="h-[680px] bg-white rounded-lg shadow-sm overflow-hidden">
				<RBCalendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					selectable
					views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
					defaultView={Views.MONTH}
					onSelectSlot={handleSelectSlot}
					onSelectEvent={handleSelectEvent}
					popup
					style={{ height: "100%" }}
				/>
			</div>

			{/* Modal */}
			{modalOpen && selectedDate && (
				<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
					{/* backdrop */}
					<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

					<div className="relative z-10 w-[min(900px,95%)] bg-white rounded-2xl shadow-2xl overflow-hidden">
						<div className="flex items-start justify-between gap-4 p-6 border-b">
							<div>
								<h3 className="text-lg font-semibold">{format(selectedDate, "EEEE, MMMM do, yyyy")}</h3>
								{selectedRange && (
									<p className="text-sm text-gray-500 mt-1">
										{format(selectedRange.start, "p")} — {format(selectedRange.end, "p")}
									</p>
								)}
							</div>

							<div className="flex items-center gap-2">
								<button
									onClick={() => setModalOpen(false)}
									className="inline-flex items-center justify-center h-9 w-9 rounded-md text-gray-600 hover:bg-gray-100"
									aria-label="Close"
								>
									✕
								</button>
							</div>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
							{/* Left: events list */}
							<div>
								<h4 className="text-sm font-medium mb-3">Events on this day</h4>

								{eventsForSelectedDay.length === 0 ? (
									<div className="rounded-md bg-gray-50 p-4 text-gray-500">No events scheduled for this day.</div>
								) : (
									<ul className="space-y-3">
										{eventsForSelectedDay
											.slice()
											.sort((a, b) => a.start.getTime() - b.start.getTime())
											.map((ev) => (
												<li key={ev.id} className="flex items-start justify-between gap-4 p-3 border rounded-lg">
													<div>
														<div className="font-semibold">{ev.title}</div>
														<div className="text-sm text-gray-500">
															{ev.allDay ? "All day" : `${format(ev.start, "p")} — ${format(ev.end, "p")}`}
														</div>
													</div>

													<div className="flex items-center gap-2">
														<button
															onClick={() => {
																// open modal prefilled (already done by selecting event, but keep quick focus)
																setTitleInput(ev.title);
																setStartTimeInput(format(ev.start, "HH:mm"));
																setEndTimeInput(format(ev.end, "HH:mm"));
																setAllDayInput(Boolean(ev.allDay));
																setSelectedDate(ev.start);
																setSelectedRange({ start: ev.start, end: ev.end });
															}}
															className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
														>
															Edit
														</button>

														<button
															onClick={() => handleDeleteEvent(ev.id)}
															className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
														>
															Delete
														</button>
													</div>
												</li>
											))}
									</ul>
								)}
							</div>

							{/* Right: form */}
							<div>
								<h4 className="text-sm font-medium mb-3">Create event</h4>

								<form onSubmit={handleCreateEvent} className="space-y-3">
									<label className="block">
										<span className="text-sm font-medium text-gray-700">Title</span>
										<input
											value={titleInput}
											onChange={(e) => setTitleInput(e.target.value)}
											placeholder="Event title"
											className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-200"
										/>
									</label>

									<label className="flex items-center gap-2 text-sm">
										<input
											type="checkbox"
											checked={allDayInput}
											onChange={(e) => setAllDayInput(e.target.checked)}
											className="h-4 w-4 rounded"
										/>
										All day
									</label>

									{!allDayInput && (
										<div className="grid grid-cols-2 gap-2">
											<label>
												<span className="text-sm text-gray-600">Start</span>
												<input
													type="time"
													value={startTimeInput}
													onChange={(e) => setStartTimeInput(e.target.value)}
													className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
												/>
											</label>

											<label>
												<span className="text-sm text-gray-600">End</span>
												<input
													type="time"
													value={endTimeInput}
													onChange={(e) => setEndTimeInput(e.target.value)}
													className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
												/>
											</label>
										</div>
									)}

									<div className="flex items-center gap-3 pt-2">
										<button
											type="submit"
											className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700"
										>
											Create
										</button>

										<button
											type="button"
											onClick={() => setModalOpen(false)}
											className="inline-flex items-center gap-2 rounded-md bg-gray-100 text-gray-700 px-4 py-2 text-sm hover:bg-gray-200"
										>
											Cancel
										</button>
									</div>

									<p className="text-xs text-gray-400 mt-2">
										Note: events are stored in memory for this demo. Persist to localStorage or a backend as needed.
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
