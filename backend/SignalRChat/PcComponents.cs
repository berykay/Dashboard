using System;
using System.Diagnostics;

namespace SignalRChat
{
    public class PcComponents
    {


        public static int getCpuData()
        {
            var process = new PerformanceCounter("Processor", "% Processor Time", "_Total");
            System.Threading.Thread.Sleep(1000);
            return ((int)process.NextValue());
        }

        public static int getRamData()
        {
            var process = new PerformanceCounter("Memory", "% Committed Bytes In Use");
            return ((int)process.NextValue());
        }

        public static int getDiskData()
        {
            var process = new PerformanceCounter("PhysicalDisk", "% Disk Time", "_Total");
            Console.WriteLine(process.NextValue());

            return ((int)process.NextValue());

        }
    }
}
