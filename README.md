# React Chart Application Documentation

Welcome to the documentation for the React Chart Application. This comprehensive guide will walk you through the features, components, usage, and best practices associated with this project.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Components](#components)
   - [Chart](#chart)
   - [Input Components](#input-components)
   - [Loader](#loader)
   - [Custom Tooltip](#custom-tooltip)
   - [Chart Section](#chart-section)
   - [App](#app)
4. [Technologies Used](#technologies-used)
5. [Usage](#usage)
6. [Author](#author)

## Introduction

The React Chart Application is a sophisticated web-based tool designed to visualize data through interactive charts. It empowers users to select dimensions and measures from a dataset, enabling them to generate insightful visual representations of their data effortlessly.

## Features

- **Dynamic Data Visualization**: Users can drag and drop dimensions and measures from a column dataset to create interactive charts dynamically.
- **Error Handling**: Real-time validation and error messages guide users in selecting valid dimensions and measures.
- **Responsive Design**: The application adapts to various screen sizes and devices for optimal user experience.

## Components

### Chart

The `Chart` component is the heart of the application, responsible for managing state, fetching data, and rendering the chart visualization.

### Input Components

- **DimensionInputBox**: Manages dimension input and provides specific props for handling dimension-related input.
- **MeasureInputBox**: Similar to `DimensionInputBox` but manages measure input.

### Loader

The `Loader` component renders a loading spinner to indicate that content is being loaded or processed.

### Custom Tooltip

The `CustomTooltip` component defines a custom tooltip to display additional information on the chart.

### Chart Section

The `ChartSection` component renders the main section of the chart, including loading spinners, chart content, and error messages.

### App

The `App` component orchestrates the rendering of the sidebar, chart, and input components. It fetches columns data from the API and passes it down to child components.

## Technologies Used

- **React**: A powerful frontend library for building user interfaces.
- **recharts**: A charting library for React applications, used for creating interactive charts.
- **Tailwind CSS**: A utility-first CSS framework used for styling components and creating responsive layouts.

## Usage

To run the React Chart Application:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev` (Vite Project).

## Author

This project was created by [Omar]. For any inquiries or feedback, please contact [oashraf304@gmail.com](mailto:oashraf304@gmail.com).
