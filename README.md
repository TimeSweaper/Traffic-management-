# 🚦 Smart Traffic Management System (DAA-Based)

## 📌 Overview

This project is a **Smart Traffic Management System** built using **Python (Flask backend)** and **JavaScript (Canvas frontend)**.
It simulates real-world traffic at an intersection using **Design and Analysis of Algorithms (DAA)** concepts such as **Greedy algorithms, Queue data structures, Priority scheduling, and Dijkstra’s shortest path algorithm**.

The system dynamically controls traffic signals, manages vehicle queues, and prioritizes emergency vehicles like ambulances.

---

## 🎯 Objectives

* Simulate real-time traffic flow at an intersection
* Apply DAA concepts to optimize traffic movement
* Visualize algorithm-driven decisions
* Implement shortest path routing using Dijkstra’s Algorithm

---

## 🧠 DAA Concepts Used

### 1. Queue (FIFO)

* Each lane is implemented as a queue
* Vehicles are processed in order of arrival

### 2. Greedy Algorithm

* Selects the next lane with **maximum score**
* Score = `number of vehicles + total waiting time`

### 3. Priority Scheduling

* Ambulances are given highest priority
* Signal immediately switches to lane with ambulance

### 4. Waiting Time Optimization

* Each vehicle tracks waiting time
* Lanes with longer waiting times get priority

### 5. Dijkstra’s Algorithm

* Used for computing shortest path between intersections
* Helps in route optimization for vehicles

---

## 🏗️ System Architecture

```
Frontend (JavaScript + Canvas)
        ↓
REST API (Flask)
        ↓
Backend Logic (Python - DAA Algorithms)
        ↓
Data Structures (Queue, Graph)
```

---

## 📁 Project Structure

```
TrafficManagement/
│
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── vehicle.py
│   │   ├── lane.py
│   │   └── intersection.py
│   ├── algorithms/
│   │   ├── scheduler.py
│   │   └── dijkstra.py
│   └── data/
│       └── map_graph.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── README.md
```

---

## ⚙️ Features

* 🚗 Add vehicles to any lane dynamically
* 🚑 Ambulance priority handling
* 🚦 Dynamic traffic light switching
* ⏱️ Waiting-time-based optimization
* 📊 Live lane statistics
* 🧭 Shortest path computation (Dijkstra)
* 🎨 Real-time visualization using Canvas

---

## 🔄 How It Works

1. User adds vehicles via frontend
2. Request is sent to Flask backend
3. Backend:

   * Adds vehicle to queue
   * Updates waiting time
   * Selects best lane using greedy logic
   * Moves vehicles step-by-step
4. Frontend:

   * Fetches updated state
   * Renders vehicles and traffic signals

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/traffic-management.git
cd traffic-management
```

---

### 2. Install Backend Dependencies

```bash
pip install flask flask-cors
```

---

### 3. Run Backend

```bash
cd backend
python app.py
```

---

### 4. Run Frontend

```bash
cd frontend
python -m http.server 5500
```

Open:

```
http://127.0.0.1:5500
```

---

## 📡 API Endpoints

| Endpoint       | Method | Description              |
| -------------- | ------ | ------------------------ |
| `/add_vehicle` | POST   | Add new vehicle          |
| `/step`        | GET    | Run simulation step      |
| `/state`       | GET    | Get current system state |

---

## 📊 Example Output

```json
{
  "lanes": {
    "north": [{"type": "car", "pos": 3, "wait": 2}],
    "south": [],
    "east": [],
    "west": []
  },
  "current_green": "north"
}
```

---

## 🧪 Future Improvements

* 🗺️ Multi-intersection grid system
* 🔍 Zoom into specific intersections
* 🤖 AI-based traffic signal prediction
* 🚗 Vehicle turning (left/right)
* 📈 Performance comparison between algorithms
* 🌐 Real map integration

---
