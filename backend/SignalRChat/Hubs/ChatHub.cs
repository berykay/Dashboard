using Google.Protobuf.Collections;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {

        private readonly IHubContext<ChatHub> _context;
        private static bool isGrpcStarted = false;

        public ChatHub(IHubContext<ChatHub> ctx)
        {
            if (_context == null)
            {

            }
            _context = ctx;

        }
        public override async Task OnConnectedAsync()

        {
            if (isGrpcStarted)
            {
                return;
            }
            isGrpcStarted = true;
            Thread thread = new Thread(() =>
            {
                GenerateRandomNumber(100, 100, 100);
            });
            thread.Start();

        }

        public async Task SendMessage(string user, string message)
        {
            await _context.Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public void StartRandomNumberThread(int maxIslemci, int maxRam, int maxDisk)
        {
            //Thread thread = new Thread(() =>
            //{
            //    GenerateRandomNumber(maxIslemci, maxRam, maxDisk);
            //});
            //thread.Start();
        }
        public async void GenerateRandomNumber(int maxIslemci, int maxRam, int maxDisk)
        {
            int time = 1;
            int x = 0;
            var temperature = 0.0;
            var tempDataFloat = 0.0;
            var tempData = "";

            while (true)
            {
                int cpu = RouteGuideServicer.GetCPU();
                int ram = RouteGuideServicer.GetRAM();
                int disk = RouteGuideServicer.GetDISK();
                int cpuFreq = RouteGuideServicer.GetCPUFreq();
                int load = RouteGuideServicer.GetLoadAvg();
                int battery = RouteGuideServicer.GetBattery();
                RepeatedField<double> cores = RouteGuideServicer.GetCores();

                PerformanceCounter memoryUsage = new PerformanceCounter("Memory", "Available MBytes");
                int memory = (int)memoryUsage.NextValue();

                PerformanceCounterCategory performanceCounterCategory = new PerformanceCounterCategory("Thermal Zone Information");
                var instances = performanceCounterCategory.GetInstanceNames();
                List<PerformanceCounter> temperatureCounters = new List<PerformanceCounter>();
                foreach (string instanceName in instances)
                {

                    foreach (PerformanceCounter counter in performanceCounterCategory.GetCounters(instanceName))
                    {
                        if (counter.CounterName == "Temperature")
                        {
                            temperatureCounters.Add(counter);
                        }
                    }
                }
                foreach (PerformanceCounter counter in temperatureCounters)
                {
                    if (counter.InstanceName == "\\_TZ.CPUZ")
                    {
                        temperature = counter.NextValue() - 273.15;
                        tempDataFloat = (double)Math.Round(temperature, 2);
                    }
                }
                /*int randomNumberIslemci = new System.Random().Next(1, maxIslemci);
                int randomNumberRam = new System.Random().Next(1, maxRam);
                int randomNumberDisk = new System.Random().Next(1, maxDisk);*/
                /*int cpuData = PcComponents.getCpuData();
                int ramData = PcComponents.getRamData();
                int diskData = PcComponents.getDiskData();*/

                await SendRandomNumber(cpu, ram, disk, battery, cpuFreq, load, cores, time, memory, tempDataFloat);

                //Console.WriteLine(time+ " " + randomNumberIslemci + " " +  randomNumberRam + " " + randomNumberDisk);
                //await SendRandomNumber(randomNumberIslemci, randomNumberRam, randomNumberDisk, time);
                //await SendRandomNumber(cpuData, ramData, diskData, time);
                Thread.Sleep(1000);
                time++;
                x++;
            }
        }
        public async Task SendRandomNumber(int randomNumberIslemci, int randomNumberRam, int randomNumberDisk, int battery, int cpuFreq, int loadAvg, RepeatedField<double> cores, int time, int memory, double tempDataFloat)
        {
            try
            {
                await _context.Clients.All.SendAsync("ReceiveIslemci", randomNumberIslemci);
                await _context.Clients.All.SendAsync("ReceiveRam", randomNumberRam);
                await _context.Clients.All.SendAsync("ReceiveDisk", randomNumberDisk);
                await _context.Clients.All.SendAsync("ReceiveTime", time);
                await _context.Clients.All.SendAsync("ReceiveBatteryData", battery);
                await _context.Clients.All.SendAsync("ReceiveCpuFreqData", cpuFreq);
                await _context.Clients.All.SendAsync("ReceiveLoadAvgData", loadAvg);
                await _context.Clients.All.SendAsync("ReceiveCoreData", cores);
                await _context.Clients.All.SendAsync("ReceiveMemoryData", memory);
                await _context.Clients.All.SendAsync("ReceiveTemperatureData", tempDataFloat);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }




    }
}