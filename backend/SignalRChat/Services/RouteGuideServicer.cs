using Google.Protobuf.Collections;
using Grpc.Core;
using Grpc.Net.Client;
using System;
using System.Threading.Tasks;

namespace SignalRChat
{
    public class RouteGuideServicer
    {
        private static int cpuData;
        private static int ramData;
        private static int diskData;
        private static int cpuFreq;
        private static int loadAvg;
        private static int battery;
        public static RepeatedField<double> cores;

        public RouteGuideServicer()
        {
            _ = DefsAsync();
        }

        public static async Task DefsAsync()
        {

            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
            var channel = GrpcChannel.ForAddress("http://localhost:50051");
            var client = new GreetService.GreetServiceClient(channel);
            using var called = client.GetNumbers(new NumberRequest { Name = 2 });
            try
            {
                while (await called.ResponseStream.MoveNext())
                {
                    NumberResponse response = called.ResponseStream.Current;
                    /*Console.WriteLine("Recieved: " + response.Recieved);
                    Debug.WriteLine("Recieved: " + response.Recieved);
                    Debug.WriteLine("Recieved: " + response.NumberCPU);
                    Debug.WriteLine("Recieved: " + response.NumberRAM);
                    Debug.WriteLine("Recieved: " + response.NumberDISK);*/
                    cpuData = response.NumberCPU;
                    ramData = response.NumberRAM;
                    diskData = response.NumberDISK;
                    cpuFreq = response.NumberCPUFreq;
                    loadAvg = response.NumberLoadAvg;
                    battery = response.NumberBattery;
                    cores = response.NumberCores;
                }
            }
            catch (Exception e)
            {

            }

        }

        public static int GetCPU()
        {
            return cpuData;
        }

        public static int GetRAM()
        {
            return ramData;
        }

        public static int GetDISK()
        {
            return diskData;
        }

        public static int GetCPUFreq()
        {
            return cpuFreq;
        }

        public static int GetLoadAvg()
        {
            return loadAvg;
        }

        public static int GetBattery()
        {
            return battery;
        }

        public static RepeatedField<double> GetCores()
        {
            return cores;
        }

    }
}
