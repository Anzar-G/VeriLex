# VeriLex

VeriLex is a comprehensive legal maxim encyclopedia and reference platform designed to provide accurate and authoritative access to fundamental Latin legal principles. The platform is built to facilitate legal research, understanding, and application of foundational maxims across various fields of law.

## System Architecture

The project consists of the following components:

*   **`verilex-web/`**: The frontend application built with Next.js (App Router), React, and TypeScript. It utilizes Zustand for state management and features a clean, encyclopedic user interface designed for readability and accessibility.
*   **`design-system/`**: Contains the core design tokens, guidelines, and visual identity rules that govern the platform's user interface, ensuring consistency and a professional, academic aesthetic.

## Features

*   **Extensive Database**: A curated collection of Latin legal maxims categorized by legal fields (Criminal Law, Civil Law, Constitutional Law, International Law, and Administrative Law).
*   **In-Depth Analysis**: Detailed explanations for each maxim, including literal translation, legal meaning, historical context, and jurisprudence.
*   **Case Law Integration**: Real-world examples of how specific maxims have been applied in court decisions.
*   **Interactive Learning Modules**:
    *   Flashcards utilizing Spaced Repetition Algorithms for effective memorization.
    *   Interactive quizzes to test comprehension.
*   **Advanced Search & Indexing**: Alphabetical indexing and field-specific filtering for efficient retrieval of information.
*   **Accessibility Features**: Integrated text-to-speech functionality for Latin pronunciation.

## Local Development Setup

To run the application locally, follow these steps:

1.  Navigate to the web application directory:
    ```bash
    cd verilex-web
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Access the application via your web browser at `http://localhost:3000`.

## Technology Stack

*   **Framework**: Next.js (React)
*   **Language**: TypeScript
*   **State Management**: Zustand
*   **Styling**: Vanilla CSS (modular design system)
*   **Icons**: Lucide React

## License

This project is proprietary and intended for internal use and reference.
