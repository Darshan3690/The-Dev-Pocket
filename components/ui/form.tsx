"use client";

import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

const FormFieldContext = React.createContext<{ name: string } | null>(null);

export function Form<TFieldValues extends FieldValues>({
  children,
  ...props
}: React.ComponentProps<typeof FormProvider<TFieldValues>>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  render,
  ...props
}: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: String(name) }}>
      <Controller name={name} render={render} {...props} />
    </FormFieldContext.Provider>
  );
}

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm font-medium leading-none', className)} {...props} />;
}

export function FormControl({ children }: { children: React.ReactElement }) {
  return children;
}

export function FormMessage({ className }: { className?: string }) {
  const context = React.useContext(FormFieldContext);
  const { formState } = useFormContext();
  const message = context ? (formState.errors as Record<string, { message?: string }>)[context.name]?.message : undefined;

  if (!message) return null;

  return <p className={cn('text-sm font-medium text-red-500', className)}>{message}</p>;
}