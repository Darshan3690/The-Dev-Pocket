# 🗺️ C++ & High-Frequency Trading (HFT) Developer Roadmap

A structured learning path for developers aiming to break into Quant Systems, Low-Latency Engineering, and HFT.

---

## 📚 Phase 1: Mastery of Modern C++
*Focus: Writing zero-overhead, memory-safe code.*

- [ ] **Effective Modern C++** (Scott Meyers) - *Understand `auto`, `move` semantics, and smart pointers.*
- [ ] **C++17 & C++20 Features** - *Concepts, Ranges, Modules, and Coroutines.*
- [ ] **STL Internals** - *Know exactly how `std::vector` and `std::unordered_map` allocate memory.*

## ⚙️ Phase 2: System Architecture (The "OS" Level)
*Focus: How hardware executes your code.*

- [ ] **Memory Model** - *Stack vs Heap, Cache Lines, False Sharing, NUMA architectures.*
- [ ] **Compiler Optimizations** - *Understanding `-O3`, Branch Prediction, Loop Unrolling, and SIMD.*
- [ ] **Lock-Free Programming** - *Atomic operations (`std::atomic`), Memory Barriers, and CAS (Compare-And-Swap).*

## 🌐 Phase 3: Low-Latency Networking
*Focus: Moving data faster than TCP allows.*

- [ ] **Socket Programming** - *Non-blocking I/O, `epoll` (Linux) / `kqueue` (BSD).*
- [ ] **Kernel Bypass** - *Solarflare OpenOnload, DPDK (Data Plane Development Kit).*
- [ ] **Protocols** - *TCP (Order Entry) vs UDP (Market Data Multicast), FIX Protocol.*

## 🛠️ Phase 4: Tools of the Trade
- **Debugging:** GDB, Valgrind (Memcheck).
- **Profiling:** Perf, Google Benchmark, FlameGraphs.
- **Build Systems:** CMake, Ninja.

---

## 🏆 Top Recommended Books
1. *Computer Systems: A Programmer's Perspective* (Bryant & O'Hallaron)
2. *C++ Concurrency in Action* (Anthony Williams)
3. *Low Latency C++* (Standard C++ Foundation Talks)