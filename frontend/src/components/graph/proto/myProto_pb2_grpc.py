# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import myProto_pb2 as myProto__pb2


class GreetServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetNumbers = channel.unary_stream(
                '/greet.GreetService/GetNumbers',
                request_serializer=myProto__pb2.NumberRequest.SerializeToString,
                response_deserializer=myProto__pb2.NumberResponse.FromString,
                )


class GreetServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetNumbers(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_GreetServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetNumbers': grpc.unary_stream_rpc_method_handler(
                    servicer.GetNumbers,
                    request_deserializer=myProto__pb2.NumberRequest.FromString,
                    response_serializer=myProto__pb2.NumberResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'greet.GreetService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class GreetService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetNumbers(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/greet.GreetService/GetNumbers',
            myProto__pb2.NumberRequest.SerializeToString,
            myProto__pb2.NumberResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)