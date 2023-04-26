from concurrent import futures
import time
import psutil
import grpc
import myProto_pb2
import myProto_pb2_grpc


class GreetService (myProto_pb2_grpc.GreetServiceServicer):
  def GetNumbers(self, request, context):
    response = myProto_pb2.NumberResponse()
    print("istek alindi")
    while True:
        
        cpu_percent = psutil.cpu_percent()
        ram = psutil.virtual_memory()[2]
        diskTotal = (psutil.disk_usage("/").total / (1024 ** 3))
        diskUsed = (psutil.disk_usage("/").used / (1024 ** 3))
        diskPercent = (diskUsed / diskTotal)*100
        battery = psutil.sensors_battery()[0]
        cpuFreq = psutil.cpu_freq()[0]
        loadAvg = psutil.getloadavg()[0]
        cores = response.numberCores
        
        for a in cores:
          response.numberCores.remove(a)
        for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
          response.numberCores.append(percentage)

        try:
          response.recieved = True
          response.numberCPU = int(cpu_percent)
          response.numberRAM = int(ram)
          response.numberDISK = int(diskPercent)
          response.numberCPUFreq = int(cpuFreq)
          response.numberLoadAvg = int(loadAvg)
          response.numberBattery = int(battery)
        except Exception as e:
          print(e)
          print(cpu_percent)
          break
        """
        response.recieved = True
        response.numberCPU = 12
        response.numberRAM = 12
        response.numberDISK = 12
        """
        yield response
        time.sleep(1)


server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
myProto_pb2_grpc.add_GreetServiceServicer_to_server(GreetService(), server)
server.add_insecure_port('[::]:50051')
server.start()

try:
    while True:
        print("server started")
        time.sleep(86400)
except KeyboardInterrupt:
    server.stop(0)
