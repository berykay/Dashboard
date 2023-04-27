# Dashboard Project

This project is a customizable dashboard built using ReactJS, React ApexCharts, React Toastify, and RSuite. It provides real-time computer data visualization such as RAM usage, CPU usage, and more. The backend is developed using .NET 3.1 and SignalR for communication between the frontend and backend.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/74079494/234943973-4e0a2c74-69f9-4da5-83c0-2b8dce6de5e9.gif)


## Team Members

- **Berkay Yıldız**  - @berykay
- **Yağmur Üstel**  - @ymr22

## Features

- Drag and drop functionality to resize, move, remove, and add new charts according to your preference.
- Real-time visualization of computer data such as RAM and CPU usage.
- Save and reset feature to persist and restore the dashboard layout.
- Responsive design for optimal viewing experience on different devices.

## Technologies Used

- ReactJS
- React ApexCharts: A wrapper for ApexCharts to create interactive and visually appealing charts.
- React Toastify: A notification library for displaying messages and alerts.
- RSuite: A suite of React components for building a responsive and customizable UI.
- .NET 3.1: Backend framework for handling data retrieval and processing.
- SignalR: A library for real-time communication between the frontend and backend.
- gRPC: A high-performance, open-source framework for remote procedure calls.

## Installation

To run this project locally, follow these steps:

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/your-username/your-repo.git

2. Install the required dependencies using npm:

    ```shell
    npm install

3. Start the development server:

    ```shell
    npm run start

The project should now be running on [http://localhost:3000](http://localhost:3000).

## Configuration

To configure the backend and SignalR connection, follow these steps:

1. Open the `backend/config` directory.

2. Modify the necessary configuration files to specify the correct connection details for your system.

3. Save the changes and restart the backend server.

## Usage

1. Upon accessing the dashboard, you will see a default set of charts displaying computer data.

2. To customize the dashboard, you can perform the following actions:
- Drag and drop charts to rearrange their positions.
- Resize charts by dragging their edges.
- Remove a chart by clicking on the close button.
- Add new charts by selecting from the available options.

3. The dashboard will automatically update the displayed data in real-time.

4. Use the save feature to persist the dashboard layout. The saved layout can be restored using the reset feature.

5. The dashboard is responsive and will adapt to different screen sizes for optimal viewing experience.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgements

- [ReactJS](https://reactjs.org/)
- [React ApexCharts](https://apexcharts.com/react-chart-demos/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [RSuite](https://rsuitejs.com/)
- [.NET](https://dotnet.microsoft.com/)
- [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1)
- [gRPC](https://grpc.io/)
