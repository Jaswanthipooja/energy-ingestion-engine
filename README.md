# High-Scale Energy Ingestion Engine

## Overview

This project implements a scalable telemetry ingestion and analytics backend for vehicle and energy systems. It ingests high-frequency vehicle and meter telemetry, stores both real-time and historical data, and exposes analytics APIs to compute performance metrics over the last 24 hours.

The goal of this project is to demonstrate backend system design, ingestion pipelines, aggregation logic, and containerized deployment using NestJS and PostgreSQL.

---

## Tech Stack

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Docker & Docker Compose

---

## Architecture Decisions

### Modular Design (NestJS)
The application is divided into feature modules:
- **IngestModule** – Handles telemetry ingestion and seeding.
- **AnalyticsModule** – Handles aggregation and analytics queries.
- **Entities Layer** – Maps database tables using TypeORM entities.

This separation improves maintainability and scalability.

---

### Database Design

Two types of tables are used:
- **Live Tables** – Store the latest snapshot of telemetry for fast access.
- **History Tables** – Store time-series telemetry for analytics queries.

PostgreSQL is used for reliability and strong aggregation support. TypeORM manages schema synchronization.

---

### Ingestion Engine

The ingestion service accepts telemetry payloads for vehicles and meters.  
It supports batch seeding for testing and inserts data into both live and history tables.

Design goals:
- Fast writes
- Clear separation between controller and service logic
- Extensible for streaming systems (Kafka, queues)

---

### Analytics Engine

Analytics queries aggregate data from history tables over the last 24 hours:
- Total AC energy consumed
- Total DC energy delivered
- Charging efficiency (DC / AC)
- Average battery temperature

Raw SQL queries are used for performance and clarity.

---

### Dockerized Deployment

The system runs fully inside Docker:
- API container (NestJS)
- Database container (PostgreSQL)

Docker Compose orchestrates both services for simple local setup.

---

## Project Structure

