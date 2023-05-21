# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import backend_api_pb2 as backend__api__pb2


class BackendStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.StartSimulation = channel.unary_unary(
                '/backend.Backend/StartSimulation',
                request_serializer=backend__api__pb2.StartSimulationRequest.SerializeToString,
                response_deserializer=backend__api__pb2.StartSimulationReply.FromString,
                )
        self.LoadSimulation = channel.unary_unary(
                '/backend.Backend/LoadSimulation',
                request_serializer=backend__api__pb2.LoadSimulationRequest.SerializeToString,
                response_deserializer=backend__api__pb2.LoadSimulationReply.FromString,
                )
        self.ResizeSimulation = channel.unary_unary(
                '/backend.Backend/ResizeSimulation',
                request_serializer=backend__api__pb2.ResizeSimulationRequest.SerializeToString,
                response_deserializer=backend__api__pb2.ResizeSimulationReply.FromString,
                )
        self.GetEnvironmentInfo = channel.unary_unary(
                '/backend.Backend/GetEnvironmentInfo',
                request_serializer=backend__api__pb2.GetEnvironmentInfoRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetEnvironmentInfoReply.FromString,
                )
        self.GetSimulationProgressionSpeed = channel.unary_unary(
                '/backend.Backend/GetSimulationProgressionSpeed',
                request_serializer=backend__api__pb2.GetSimulationProgressionSpeedRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetSimulationProgressionSpeedReply.FromString,
                )
        self.ChangeSimulationProgressionSpeed = channel.unary_unary(
                '/backend.Backend/ChangeSimulationProgressionSpeed',
                request_serializer=backend__api__pb2.ChangeSimulationProgressionSpeedRequest.SerializeToString,
                response_deserializer=backend__api__pb2.ChangeSimulationProgressionSpeedReply.FromString,
                )
        self.CreateNewSpecies = channel.unary_unary(
                '/backend.Backend/CreateNewSpecies',
                request_serializer=backend__api__pb2.CreateNewSpeciesRequest.SerializeToString,
                response_deserializer=backend__api__pb2.CreateNewSpeciesReply.FromString,
                )
        self.CreateNewCreature = channel.unary_unary(
                '/backend.Backend/CreateNewCreature',
                request_serializer=backend__api__pb2.CreateNewCreatureRequest.SerializeToString,
                response_deserializer=backend__api__pb2.CreateNewCreatureReply.FromString,
                )
        self.GetSpeciesList = channel.unary_unary(
                '/backend.Backend/GetSpeciesList',
                request_serializer=backend__api__pb2.GetSpeciesListRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetSpeciesListReply.FromString,
                )
        self.DefineNewSpeciesRelationship = channel.unary_unary(
                '/backend.Backend/DefineNewSpeciesRelationship',
                request_serializer=backend__api__pb2.DefineNewSpeciesRelationshipRequest.SerializeToString,
                response_deserializer=backend__api__pb2.DefineNewSpeciesRelationshipReply.FromString,
                )
        self.GetSpeciesInfo = channel.unary_unary(
                '/backend.Backend/GetSpeciesInfo',
                request_serializer=backend__api__pb2.GetSpeciesInfoRequest.SerializeToString,
                response_deserializer=backend__api__pb2.SpeciesInfo.FromString,
                )
        self.GetCreatureInfo = channel.unary_unary(
                '/backend.Backend/GetCreatureInfo',
                request_serializer=backend__api__pb2.GetCreatureInfoRequest.SerializeToString,
                response_deserializer=backend__api__pb2.CreatureInfo.FromString,
                )
        self.CreateTopography = channel.unary_unary(
                '/backend.Backend/CreateTopography',
                request_serializer=backend__api__pb2.CreateTopographyRequest.SerializeToString,
                response_deserializer=backend__api__pb2.CreateTopographyReply.FromString,
                )
        self.DeleteTopography = channel.unary_unary(
                '/backend.Backend/DeleteTopography',
                request_serializer=backend__api__pb2.DeleteTopographyRequest.SerializeToString,
                response_deserializer=backend__api__pb2.DeleteTopographyReply.FromString,
                )
        self.GetTopography = channel.unary_unary(
                '/backend.Backend/GetTopography',
                request_serializer=backend__api__pb2.GetTopographyRequest.SerializeToString,
                response_deserializer=backend__api__pb2.TopographyTable.FromString,
                )
        self.AdvanceSimulation = channel.unary_unary(
                '/backend.Backend/AdvanceSimulation',
                request_serializer=backend__api__pb2.AdvanceSimulationRequest.SerializeToString,
                response_deserializer=backend__api__pb2.AdvanceSimulationReply.FromString,
                )
        self.GetTextToggle = channel.unary_unary(
                '/backend.Backend/GetTextToggle',
                request_serializer=backend__api__pb2.GetTextToggleRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetTextToggleReply.FromString,
                )
        self.UpdateTextToggle = channel.unary_unary(
                '/backend.Backend/UpdateTextToggle',
                request_serializer=backend__api__pb2.UpdateTextToggleRequest.SerializeToString,
                response_deserializer=backend__api__pb2.UpdateTextToggleReply.FromString,
                )
        self.GetUpdateFlag = channel.unary_unary(
                '/backend.Backend/GetUpdateFlag',
                request_serializer=backend__api__pb2.GetUpdateFlagRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetUpdateFlagReply.FromString,
                )
        self.EditUpdateFlag = channel.unary_unary(
                '/backend.Backend/EditUpdateFlag',
                request_serializer=backend__api__pb2.EditUpdateFlagRequest.SerializeToString,
                response_deserializer=backend__api__pb2.EditUpdateFlagReply.FromString,
                )
        self.GetTimeOfSimulation = channel.unary_unary(
                '/backend.Backend/GetTimeOfSimulation',
                request_serializer=backend__api__pb2.GetTimeOfSimulationRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetTimeOfSimulationReply.FromString,
                )
        self.GetLightVisibility = channel.unary_unary(
                '/backend.Backend/GetLightVisibility',
                request_serializer=backend__api__pb2.GetLightVisibilityRequest.SerializeToString,
                response_deserializer=backend__api__pb2.GetLightVisibilityReply.FromString,
                )


class BackendServicer(object):
    """Missing associated documentation comment in .proto file."""

    def StartSimulation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def LoadSimulation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ResizeSimulation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetEnvironmentInfo(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetSimulationProgressionSpeed(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def ChangeSimulationProgressionSpeed(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CreateNewSpecies(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CreateNewCreature(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetSpeciesList(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DefineNewSpeciesRelationship(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetSpeciesInfo(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetCreatureInfo(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def CreateTopography(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DeleteTopography(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetTopography(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def AdvanceSimulation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetTextToggle(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def UpdateTextToggle(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetUpdateFlag(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def EditUpdateFlag(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetTimeOfSimulation(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetLightVisibility(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_BackendServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'StartSimulation': grpc.unary_unary_rpc_method_handler(
                    servicer.StartSimulation,
                    request_deserializer=backend__api__pb2.StartSimulationRequest.FromString,
                    response_serializer=backend__api__pb2.StartSimulationReply.SerializeToString,
            ),
            'LoadSimulation': grpc.unary_unary_rpc_method_handler(
                    servicer.LoadSimulation,
                    request_deserializer=backend__api__pb2.LoadSimulationRequest.FromString,
                    response_serializer=backend__api__pb2.LoadSimulationReply.SerializeToString,
            ),
            'ResizeSimulation': grpc.unary_unary_rpc_method_handler(
                    servicer.ResizeSimulation,
                    request_deserializer=backend__api__pb2.ResizeSimulationRequest.FromString,
                    response_serializer=backend__api__pb2.ResizeSimulationReply.SerializeToString,
            ),
            'GetEnvironmentInfo': grpc.unary_unary_rpc_method_handler(
                    servicer.GetEnvironmentInfo,
                    request_deserializer=backend__api__pb2.GetEnvironmentInfoRequest.FromString,
                    response_serializer=backend__api__pb2.GetEnvironmentInfoReply.SerializeToString,
            ),
            'GetSimulationProgressionSpeed': grpc.unary_unary_rpc_method_handler(
                    servicer.GetSimulationProgressionSpeed,
                    request_deserializer=backend__api__pb2.GetSimulationProgressionSpeedRequest.FromString,
                    response_serializer=backend__api__pb2.GetSimulationProgressionSpeedReply.SerializeToString,
            ),
            'ChangeSimulationProgressionSpeed': grpc.unary_unary_rpc_method_handler(
                    servicer.ChangeSimulationProgressionSpeed,
                    request_deserializer=backend__api__pb2.ChangeSimulationProgressionSpeedRequest.FromString,
                    response_serializer=backend__api__pb2.ChangeSimulationProgressionSpeedReply.SerializeToString,
            ),
            'CreateNewSpecies': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateNewSpecies,
                    request_deserializer=backend__api__pb2.CreateNewSpeciesRequest.FromString,
                    response_serializer=backend__api__pb2.CreateNewSpeciesReply.SerializeToString,
            ),
            'CreateNewCreature': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateNewCreature,
                    request_deserializer=backend__api__pb2.CreateNewCreatureRequest.FromString,
                    response_serializer=backend__api__pb2.CreateNewCreatureReply.SerializeToString,
            ),
            'GetSpeciesList': grpc.unary_unary_rpc_method_handler(
                    servicer.GetSpeciesList,
                    request_deserializer=backend__api__pb2.GetSpeciesListRequest.FromString,
                    response_serializer=backend__api__pb2.GetSpeciesListReply.SerializeToString,
            ),
            'DefineNewSpeciesRelationship': grpc.unary_unary_rpc_method_handler(
                    servicer.DefineNewSpeciesRelationship,
                    request_deserializer=backend__api__pb2.DefineNewSpeciesRelationshipRequest.FromString,
                    response_serializer=backend__api__pb2.DefineNewSpeciesRelationshipReply.SerializeToString,
            ),
            'GetSpeciesInfo': grpc.unary_unary_rpc_method_handler(
                    servicer.GetSpeciesInfo,
                    request_deserializer=backend__api__pb2.GetSpeciesInfoRequest.FromString,
                    response_serializer=backend__api__pb2.SpeciesInfo.SerializeToString,
            ),
            'GetCreatureInfo': grpc.unary_unary_rpc_method_handler(
                    servicer.GetCreatureInfo,
                    request_deserializer=backend__api__pb2.GetCreatureInfoRequest.FromString,
                    response_serializer=backend__api__pb2.CreatureInfo.SerializeToString,
            ),
            'CreateTopography': grpc.unary_unary_rpc_method_handler(
                    servicer.CreateTopography,
                    request_deserializer=backend__api__pb2.CreateTopographyRequest.FromString,
                    response_serializer=backend__api__pb2.CreateTopographyReply.SerializeToString,
            ),
            'DeleteTopography': grpc.unary_unary_rpc_method_handler(
                    servicer.DeleteTopography,
                    request_deserializer=backend__api__pb2.DeleteTopographyRequest.FromString,
                    response_serializer=backend__api__pb2.DeleteTopographyReply.SerializeToString,
            ),
            'GetTopography': grpc.unary_unary_rpc_method_handler(
                    servicer.GetTopography,
                    request_deserializer=backend__api__pb2.GetTopographyRequest.FromString,
                    response_serializer=backend__api__pb2.TopographyTable.SerializeToString,
            ),
            'AdvanceSimulation': grpc.unary_unary_rpc_method_handler(
                    servicer.AdvanceSimulation,
                    request_deserializer=backend__api__pb2.AdvanceSimulationRequest.FromString,
                    response_serializer=backend__api__pb2.AdvanceSimulationReply.SerializeToString,
            ),
            'GetTextToggle': grpc.unary_unary_rpc_method_handler(
                    servicer.GetTextToggle,
                    request_deserializer=backend__api__pb2.GetTextToggleRequest.FromString,
                    response_serializer=backend__api__pb2.GetTextToggleReply.SerializeToString,
            ),
            'UpdateTextToggle': grpc.unary_unary_rpc_method_handler(
                    servicer.UpdateTextToggle,
                    request_deserializer=backend__api__pb2.UpdateTextToggleRequest.FromString,
                    response_serializer=backend__api__pb2.UpdateTextToggleReply.SerializeToString,
            ),
            'GetUpdateFlag': grpc.unary_unary_rpc_method_handler(
                    servicer.GetUpdateFlag,
                    request_deserializer=backend__api__pb2.GetUpdateFlagRequest.FromString,
                    response_serializer=backend__api__pb2.GetUpdateFlagReply.SerializeToString,
            ),
            'EditUpdateFlag': grpc.unary_unary_rpc_method_handler(
                    servicer.EditUpdateFlag,
                    request_deserializer=backend__api__pb2.EditUpdateFlagRequest.FromString,
                    response_serializer=backend__api__pb2.EditUpdateFlagReply.SerializeToString,
            ),
            'GetTimeOfSimulation': grpc.unary_unary_rpc_method_handler(
                    servicer.GetTimeOfSimulation,
                    request_deserializer=backend__api__pb2.GetTimeOfSimulationRequest.FromString,
                    response_serializer=backend__api__pb2.GetTimeOfSimulationReply.SerializeToString,
            ),
            'GetLightVisibility': grpc.unary_unary_rpc_method_handler(
                    servicer.GetLightVisibility,
                    request_deserializer=backend__api__pb2.GetLightVisibilityRequest.FromString,
                    response_serializer=backend__api__pb2.GetLightVisibilityReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'backend.Backend', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Backend(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def StartSimulation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/StartSimulation',
            backend__api__pb2.StartSimulationRequest.SerializeToString,
            backend__api__pb2.StartSimulationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def LoadSimulation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/LoadSimulation',
            backend__api__pb2.LoadSimulationRequest.SerializeToString,
            backend__api__pb2.LoadSimulationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ResizeSimulation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/ResizeSimulation',
            backend__api__pb2.ResizeSimulationRequest.SerializeToString,
            backend__api__pb2.ResizeSimulationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetEnvironmentInfo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetEnvironmentInfo',
            backend__api__pb2.GetEnvironmentInfoRequest.SerializeToString,
            backend__api__pb2.GetEnvironmentInfoReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetSimulationProgressionSpeed(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetSimulationProgressionSpeed',
            backend__api__pb2.GetSimulationProgressionSpeedRequest.SerializeToString,
            backend__api__pb2.GetSimulationProgressionSpeedReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def ChangeSimulationProgressionSpeed(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/ChangeSimulationProgressionSpeed',
            backend__api__pb2.ChangeSimulationProgressionSpeedRequest.SerializeToString,
            backend__api__pb2.ChangeSimulationProgressionSpeedReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CreateNewSpecies(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/CreateNewSpecies',
            backend__api__pb2.CreateNewSpeciesRequest.SerializeToString,
            backend__api__pb2.CreateNewSpeciesReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CreateNewCreature(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/CreateNewCreature',
            backend__api__pb2.CreateNewCreatureRequest.SerializeToString,
            backend__api__pb2.CreateNewCreatureReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetSpeciesList(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetSpeciesList',
            backend__api__pb2.GetSpeciesListRequest.SerializeToString,
            backend__api__pb2.GetSpeciesListReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DefineNewSpeciesRelationship(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/DefineNewSpeciesRelationship',
            backend__api__pb2.DefineNewSpeciesRelationshipRequest.SerializeToString,
            backend__api__pb2.DefineNewSpeciesRelationshipReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetSpeciesInfo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetSpeciesInfo',
            backend__api__pb2.GetSpeciesInfoRequest.SerializeToString,
            backend__api__pb2.SpeciesInfo.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetCreatureInfo(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetCreatureInfo',
            backend__api__pb2.GetCreatureInfoRequest.SerializeToString,
            backend__api__pb2.CreatureInfo.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def CreateTopography(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/CreateTopography',
            backend__api__pb2.CreateTopographyRequest.SerializeToString,
            backend__api__pb2.CreateTopographyReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def DeleteTopography(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/DeleteTopography',
            backend__api__pb2.DeleteTopographyRequest.SerializeToString,
            backend__api__pb2.DeleteTopographyReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetTopography(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetTopography',
            backend__api__pb2.GetTopographyRequest.SerializeToString,
            backend__api__pb2.TopographyTable.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def AdvanceSimulation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/AdvanceSimulation',
            backend__api__pb2.AdvanceSimulationRequest.SerializeToString,
            backend__api__pb2.AdvanceSimulationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetTextToggle(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetTextToggle',
            backend__api__pb2.GetTextToggleRequest.SerializeToString,
            backend__api__pb2.GetTextToggleReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def UpdateTextToggle(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/UpdateTextToggle',
            backend__api__pb2.UpdateTextToggleRequest.SerializeToString,
            backend__api__pb2.UpdateTextToggleReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetUpdateFlag(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetUpdateFlag',
            backend__api__pb2.GetUpdateFlagRequest.SerializeToString,
            backend__api__pb2.GetUpdateFlagReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def EditUpdateFlag(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/EditUpdateFlag',
            backend__api__pb2.EditUpdateFlagRequest.SerializeToString,
            backend__api__pb2.EditUpdateFlagReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetTimeOfSimulation(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetTimeOfSimulation',
            backend__api__pb2.GetTimeOfSimulationRequest.SerializeToString,
            backend__api__pb2.GetTimeOfSimulationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetLightVisibility(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/backend.Backend/GetLightVisibility',
            backend__api__pb2.GetLightVisibilityRequest.SerializeToString,
            backend__api__pb2.GetLightVisibilityReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
