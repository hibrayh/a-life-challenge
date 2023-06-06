# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: backend_api.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11\x62\x61\x63kend_api.proto\x12\x07\x62\x61\x63kend\"r\n\x16StartSimulationRequest\x12\x17\n\x0fsimulationWidth\x18\x01 \x01(\x05\x12\x18\n\x10simulationHeight\x18\x02 \x01(\x05\x12\x13\n\x0b\x63olumnCount\x18\x03 \x01(\x05\x12\x10\n\x08rowCount\x18\x04 \x01(\x05\"*\n\x14StartSimulationReply\x12\x12\n\nsimStarted\x18\x01 \x01(\x08\"\x17\n\x15SaveSimulationRequest\"\'\n\x13SaveSimulationReply\x12\x10\n\x08saveInfo\x18\x01 \x01(\t\")\n\x15LoadSimulationRequest\x12\x10\n\x08saveData\x18\x01 \x01(\t\"(\n\x13LoadSimulationReply\x12\x11\n\tsimLoaded\x18\x01 \x01(\x08\"G\n\x17ResizeSimulationRequest\x12\x15\n\rnewXDimension\x18\x01 \x01(\x05\x12\x15\n\rnewYDimension\x18\x02 \x01(\x05\"+\n\x15ResizeSimulationReply\x12\x12\n\nsimResized\x18\x01 \x01(\x08\"\xfb\x06\n\nGenomeInfo\x12\x12\n\nvisibility\x18\x01 \x01(\x02\x12\x11\n\tmaxHealth\x18\x02 \x01(\x02\x12\x0e\n\x06\x63\x61nSee\x18\x03 \x01(\x08\x12\x10\n\x08\x63\x61nSmell\x18\x04 \x01(\x08\x12\x0f\n\x07\x63\x61nHear\x18\x05 \x01(\x08\x12\x14\n\x0csightAbility\x18\x06 \x01(\x02\x12\x14\n\x0csmellAbility\x18\x07 \x01(\x02\x12\x16\n\x0ehearingAbility\x18\x08 \x01(\x02\x12\x12\n\nsightRange\x18\t \x01(\x02\x12\x12\n\nsmellRange\x18\n \x01(\x02\x12\x14\n\x0chearingRange\x18\x0b \x01(\x02\x12\x14\n\x0creactionTime\x18\x0c \x01(\x02\x12\x13\n\x0bimpulsivity\x18\r \x01(\x02\x12\x18\n\x10selfPreservation\x18\x0e \x01(\x02\x12\x10\n\x08mobility\x18\x0f \x01(\x02\x12\x18\n\x10reproductionType\x18\x10 \x01(\t\x12\x1c\n\x14reproductionCooldown\x18\x11 \x01(\x02\x12\x17\n\x0foffspringAmount\x18\x12 \x01(\x02\x12\x12\n\nmotivation\x18\x13 \x01(\x02\x12\x11\n\tmaxEnergy\x18\x14 \x01(\x02\x12\x12\n\nmetabolism\x18\x15 \x01(\x02\x12\x15\n\rindividualism\x18\x16 \x01(\x02\x12\x13\n\x0bterritorial\x18\x17 \x01(\x02\x12\x15\n\rfightOrFlight\x18\x18 \x01(\x02\x12\x11\n\thostility\x18\x19 \x01(\x02\x12\r\n\x05scent\x18\x1a \x01(\x02\x12\x0f\n\x07stealth\x18\x1b \x01(\x02\x12\x16\n\x0elifeExpectancy\x18\x1c \x01(\x02\x12\x10\n\x08maturity\x18\x1d \x01(\x02\x12\x18\n\x10offensiveAbility\x18\x1e \x01(\x02\x12\x18\n\x10\x64\x65\x66\x65nsiveAbility\x18\x1f \x01(\x02\x12\x16\n\x0e\x65\x66\x66\x65\x63tFromHost\x18  \x01(\x02\x12\x1a\n\x12\x65\x66\x66\x65\x63tFromParasite\x18! \x01(\x02\x12\x12\n\nprotecting\x18\" \x01(\x02\x12\x11\n\tnurturing\x18# \x01(\x02\x12\x1f\n\x17\x65\x66\x66\x65\x63tFromBeingNurtured\x18$ \x01(\x02\x12\x1f\n\x17shortTermMemoryAccuracy\x18% \x01(\x02\x12\x1f\n\x17shortTermMemoryCapacity\x18& \x01(\x02\x12\r\n\x05shape\x18\' \x01(\t\x12\r\n\x05\x63olor\x18( \x01(\t\"y\n\x0cResourceInfo\x12\n\n\x02id\x18\x01 \x01(\t\x12\x15\n\rreplenishment\x18\x02 \x01(\x02\x12\x13\n\x0bxCoordinate\x18\x03 \x01(\x02\x12\x13\n\x0byCoordinate\x18\x04 \x01(\x02\x12\r\n\x05shape\x18\x05 \x01(\t\x12\r\n\x05\x63olor\x18\x06 \x01(\t\"\x16\n\x05\x41rray\x12\r\n\x05items\x18\x01 \x03(\x05\"&\n\x05Table\x12\x1d\n\x05items\x18\x01 \x03(\x0b\x32\x0e.backend.Array\"2\n\rElevationInfo\x12!\n\televation\x18\x01 \x03(\x0b\x32\x0e.backend.Table\"\x7f\n\x15\x43reatureAnimationInfo\x12\n\n\x02id\x18\x01 \x01(\t\x12\x13\n\x0bxCoordinate\x18\x03 \x01(\x02\x12\x13\n\x0byCoordinate\x18\x04 \x01(\x02\x12\r\n\x05shape\x18\x05 \x01(\t\x12\r\n\x05\x63olor\x18\x06 \x01(\t\x12\x12\n\nlastAction\x18\x07 \x01(\t\"P\n\x0c\x43reatureInfo\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07species\x18\x02 \x01(\t\x12#\n\x06genome\x18\x03 \x01(\x0b\x32\x13.backend.GenomeInfo\"b\n\x0bSpeciesInfo\x12\x13\n\x0bspeciesName\x18\x01 \x01(\t\x12+\n\x0egenomeTemplate\x18\x02 \x01(\x0b\x32\x13.backend.GenomeInfo\x12\x11\n\tcreatures\x18\x03 \x03(\t\"\x1b\n\x19GetEnvironmentInfoRequest\"v\n\x17GetEnvironmentInfoReply\x12\x31\n\tcreatures\x18\x01 \x03(\x0b\x32\x1e.backend.CreatureAnimationInfo\x12(\n\tresources\x18\x02 \x03(\x0b\x32\x15.backend.ResourceInfo\"&\n$GetSimulationProgressionSpeedRequest\"=\n\"GetSimulationProgressionSpeedReply\x12\x17\n\x0fsimulationSpeed\x18\x01 \x01(\x05\"E\n\'ChangeSimulationProgressionSpeedRequest\x12\x1a\n\x12newSimulationSpeed\x18\x01 \x01(\x05\"G\n%ChangeSimulationProgressionSpeedReply\x12\x1e\n\x16simulationSpeedChanged\x18\x01 \x01(\x08\"x\n\x17\x43reateNewSpeciesRequest\x12\x13\n\x0bspeciesName\x18\x01 \x01(\t\x12*\n\rinitialGenome\x18\x02 \x01(\x0b\x32\x13.backend.GenomeInfo\x12\x1c\n\x14initialNumberToSpawn\x18\x03 \x01(\x05\"/\n\x15\x43reateNewSpeciesReply\x12\x16\n\x0especiesCreated\x18\x01 \x01(\x08\"r\n\x18\x43reateNewCreatureRequest\x12\x13\n\x0bspeciesName\x18\x01 \x01(\t\x12#\n\x06genome\x18\x02 \x01(\x0b\x32\x13.backend.GenomeInfo\x12\x1c\n\x14initialNumberToSpawn\x18\x03 \x01(\x05\"1\n\x16\x43reateNewCreatureReply\x12\x17\n\x0f\x63reatureCreated\x18\x01 \x01(\x08\"\x17\n\x15GetSpeciesListRequest\"&\n\x13GetSpeciesListReply\x12\x0f\n\x07species\x18\x01 \x03(\t\"n\n#DefineNewSpeciesRelationshipRequest\x12\x15\n\rsourceSpecies\x18\x01 \x01(\t\x12\x1a\n\x12\x64\x65stinationSpecies\x18\x02 \x01(\t\x12\x14\n\x0crelationship\x18\x03 \x01(\t\"?\n!DefineNewSpeciesRelationshipReply\x12\x1a\n\x12setNewRelationship\x18\x01 \x01(\x08\"2\n\x15GetSpeciesInfoRequest\x12\x19\n\x11speciesOfInterest\x18\x01 \x01(\t\"E\n\x16GetCreatureInfoRequest\x12\x1a\n\x12\x63reatureOfInterest\x18\x01 \x01(\t\x12\x0f\n\x07species\x18\x02 \x01(\t\"D\n\x17\x43reateTopographyRequest\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x0b\n\x03row\x18\x02 \x01(\x05\x12\x0e\n\x06\x63olumn\x18\x03 \x01(\x05\"0\n\x15\x43reateTopographyReply\x12\x17\n\x0ftopographyAdded\x18\x01 \x01(\x08\"6\n\x17\x44\x65leteTopographyRequest\x12\x0b\n\x03row\x18\x01 \x01(\x05\x12\x0e\n\x06\x63olumn\x18\x02 \x01(\x05\"2\n\x15\x44\x65leteTopographyReply\x12\x19\n\x11topographyDeleted\x18\x01 \x01(\x08\"V\n\x0eTopographyInfo\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0b\n\x03row\x18\x02 \x01(\x05\x12\x0e\n\x06\x63olumn\x18\x03 \x01(\x05\x12\x0c\n\x04type\x18\x04 \x01(\t\x12\r\n\x05\x63olor\x18\x05 \x01(\t\"6\n\rTopographyRow\x12%\n\x04item\x18\x01 \x03(\x0b\x32\x17.backend.TopographyInfo\"6\n\x0fTopographyTable\x12#\n\x03row\x18\x01 \x03(\x0b\x32\x16.backend.TopographyRow\"\x16\n\x14GetTopographyRequest\"+\n\x12SetTopographyReply\x12\x15\n\rtopographySet\x18\x01 \x01(\x08\"\xa8\x01\n\x16TopographyTemplateInfo\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x1a\n\x12\x65levationAmplitude\x18\x02 \x01(\x02\x12\x17\n\x0fresourceDensity\x18\x03 \x01(\x02\x12\x1d\n\x15resourceReplenishment\x18\x04 \x01(\x02\x12\x15\n\rresourceColor\x18\x05 \x01(\t\x12\x15\n\rresourceShape\x18\x06 \x01(\t\"6\n\x1d\x44\x65\x66ineTopographyTemplateReply\x12\x15\n\rpresetDefined\x18\x01 \x01(\x08\"\x1f\n\x1dGetTopographyTemplatesRequest\"B\n\x1bGetTopographyTemplatesReply\x12\x14\n\x0ctemplateName\x18\x01 \x03(\t\x12\r\n\x05\x63olor\x18\x02 \x03(\t\"2\n\x18\x41\x64vanceSimulationRequest\x12\x16\n\x0estepsToAdvance\x18\x01 \x01(\x05\"4\n\x16\x41\x64vanceSimulationReply\x12\x1a\n\x12simulationAdvanced\x18\x01 \x01(\x08\"\x16\n\x14GetTextToggleRequest\"(\n\x12GetTextToggleReply\x12\x12\n\ntextToggle\x18\x01 \x01(\x08\"0\n\x17UpdateTextToggleRequest\x12\x15\n\rnewTextToggle\x18\x01 \x01(\x08\",\n\x15UpdateTextToggleReply\x12\x13\n\x0btextToggled\x18\x01 \x01(\x08\"\x16\n\x14GetUpdateFlagRequest\"(\n\x12GetUpdateFlagReply\x12\x12\n\nupdateFlag\x18\x01 \x01(\x08\".\n\x15\x45\x64itUpdateFlagRequest\x12\x15\n\rnewUpdateFlag\x18\x01 \x01(\x08\"*\n\x13\x45\x64itUpdateFlagReply\x12\x13\n\x0bupdatedFlag\x18\x01 \x01(\x08\"\x1c\n\x1aGetTimeOfSimulationRequest\"4\n\x18GetTimeOfSimulationReply\x12\x18\n\x10timeOfSimulation\x18\x01 \x01(\x05\"\x1b\n\x19GetLightVisibilityRequest\"2\n\x17GetLightVisibilityReply\x12\x17\n\x0flightVisibility\x18\x01 \x01(\x02\x32\xd1\x12\n\x07\x42\x61\x63kend\x12S\n\x0fStartSimulation\x12\x1f.backend.StartSimulationRequest\x1a\x1d.backend.StartSimulationReply\"\x00\x12P\n\x0eSaveSimulation\x12\x1e.backend.SaveSimulationRequest\x1a\x1c.backend.SaveSimulationReply\"\x00\x12P\n\x0eLoadSimulation\x12\x1e.backend.LoadSimulationRequest\x1a\x1c.backend.LoadSimulationReply\"\x00\x12V\n\x10ResizeSimulation\x12 .backend.ResizeSimulationRequest\x1a\x1e.backend.ResizeSimulationReply\"\x00\x12\\\n\x12GetEnvironmentInfo\x12\".backend.GetEnvironmentInfoRequest\x1a .backend.GetEnvironmentInfoReply\"\x00\x12}\n\x1dGetSimulationProgressionSpeed\x12-.backend.GetSimulationProgressionSpeedRequest\x1a+.backend.GetSimulationProgressionSpeedReply\"\x00\x12\x86\x01\n ChangeSimulationProgressionSpeed\x12\x30.backend.ChangeSimulationProgressionSpeedRequest\x1a..backend.ChangeSimulationProgressionSpeedReply\"\x00\x12V\n\x10\x43reateNewSpecies\x12 .backend.CreateNewSpeciesRequest\x1a\x1e.backend.CreateNewSpeciesReply\"\x00\x12Y\n\x11\x43reateNewCreature\x12!.backend.CreateNewCreatureRequest\x1a\x1f.backend.CreateNewCreatureReply\"\x00\x12P\n\x0eGetSpeciesList\x12\x1e.backend.GetSpeciesListRequest\x1a\x1c.backend.GetSpeciesListReply\"\x00\x12z\n\x1c\x44\x65\x66ineNewSpeciesRelationship\x12,.backend.DefineNewSpeciesRelationshipRequest\x1a*.backend.DefineNewSpeciesRelationshipReply\"\x00\x12H\n\x0eGetSpeciesInfo\x12\x1e.backend.GetSpeciesInfoRequest\x1a\x14.backend.SpeciesInfo\"\x00\x12K\n\x0fGetCreatureInfo\x12\x1f.backend.GetCreatureInfoRequest\x1a\x15.backend.CreatureInfo\"\x00\x12V\n\x10\x43reateTopography\x12 .backend.CreateTopographyRequest\x1a\x1e.backend.CreateTopographyReply\"\x00\x12V\n\x10\x44\x65leteTopography\x12 .backend.DeleteTopographyRequest\x1a\x1e.backend.DeleteTopographyReply\"\x00\x12J\n\rGetTopography\x12\x1d.backend.GetTopographyRequest\x1a\x18.backend.TopographyTable\"\x00\x12H\n\rSetTopography\x12\x18.backend.TopographyTable\x1a\x1b.backend.SetTopographyReply\"\x00\x12\x65\n\x18\x44\x65\x66ineTopographyTemplate\x12\x1f.backend.TopographyTemplateInfo\x1a&.backend.DefineTopographyTemplateReply\"\x00\x12h\n\x16GetTopographyTemplates\x12&.backend.GetTopographyTemplatesRequest\x1a$.backend.GetTopographyTemplatesReply\"\x00\x12Y\n\x11\x41\x64vanceSimulation\x12!.backend.AdvanceSimulationRequest\x1a\x1f.backend.AdvanceSimulationReply\"\x00\x12M\n\rGetTextToggle\x12\x1d.backend.GetTextToggleRequest\x1a\x1b.backend.GetTextToggleReply\"\x00\x12V\n\x10UpdateTextToggle\x12 .backend.UpdateTextToggleRequest\x1a\x1e.backend.UpdateTextToggleReply\"\x00\x12M\n\rGetUpdateFlag\x12\x1d.backend.GetUpdateFlagRequest\x1a\x1b.backend.GetUpdateFlagReply\"\x00\x12P\n\x0e\x45\x64itUpdateFlag\x12\x1e.backend.EditUpdateFlagRequest\x1a\x1c.backend.EditUpdateFlagReply\"\x00\x12_\n\x13GetTimeOfSimulation\x12#.backend.GetTimeOfSimulationRequest\x1a!.backend.GetTimeOfSimulationReply\"\x00\x12\\\n\x12GetLightVisibility\x12\".backend.GetLightVisibilityRequest\x1a .backend.GetLightVisibilityReply\"\x00\x62\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'backend_api_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _STARTSIMULATIONREQUEST._serialized_start=30
  _STARTSIMULATIONREQUEST._serialized_end=144
  _STARTSIMULATIONREPLY._serialized_start=146
  _STARTSIMULATIONREPLY._serialized_end=188
  _SAVESIMULATIONREQUEST._serialized_start=190
  _SAVESIMULATIONREQUEST._serialized_end=213
  _SAVESIMULATIONREPLY._serialized_start=215
  _SAVESIMULATIONREPLY._serialized_end=254
  _LOADSIMULATIONREQUEST._serialized_start=256
  _LOADSIMULATIONREQUEST._serialized_end=297
  _LOADSIMULATIONREPLY._serialized_start=299
  _LOADSIMULATIONREPLY._serialized_end=339
  _RESIZESIMULATIONREQUEST._serialized_start=341
  _RESIZESIMULATIONREQUEST._serialized_end=412
  _RESIZESIMULATIONREPLY._serialized_start=414
  _RESIZESIMULATIONREPLY._serialized_end=457
  _GENOMEINFO._serialized_start=460
  _GENOMEINFO._serialized_end=1351
  _RESOURCEINFO._serialized_start=1353
  _RESOURCEINFO._serialized_end=1474
  _ARRAY._serialized_start=1476
  _ARRAY._serialized_end=1498
  _TABLE._serialized_start=1500
  _TABLE._serialized_end=1538
  _ELEVATIONINFO._serialized_start=1540
  _ELEVATIONINFO._serialized_end=1590
  _CREATUREANIMATIONINFO._serialized_start=1592
  _CREATUREANIMATIONINFO._serialized_end=1719
  _CREATUREINFO._serialized_start=1721
  _CREATUREINFO._serialized_end=1801
  _SPECIESINFO._serialized_start=1803
  _SPECIESINFO._serialized_end=1901
  _GETENVIRONMENTINFOREQUEST._serialized_start=1903
  _GETENVIRONMENTINFOREQUEST._serialized_end=1930
  _GETENVIRONMENTINFOREPLY._serialized_start=1932
  _GETENVIRONMENTINFOREPLY._serialized_end=2050
  _GETSIMULATIONPROGRESSIONSPEEDREQUEST._serialized_start=2052
  _GETSIMULATIONPROGRESSIONSPEEDREQUEST._serialized_end=2090
  _GETSIMULATIONPROGRESSIONSPEEDREPLY._serialized_start=2092
  _GETSIMULATIONPROGRESSIONSPEEDREPLY._serialized_end=2153
  _CHANGESIMULATIONPROGRESSIONSPEEDREQUEST._serialized_start=2155
  _CHANGESIMULATIONPROGRESSIONSPEEDREQUEST._serialized_end=2224
  _CHANGESIMULATIONPROGRESSIONSPEEDREPLY._serialized_start=2226
  _CHANGESIMULATIONPROGRESSIONSPEEDREPLY._serialized_end=2297
  _CREATENEWSPECIESREQUEST._serialized_start=2299
  _CREATENEWSPECIESREQUEST._serialized_end=2419
  _CREATENEWSPECIESREPLY._serialized_start=2421
  _CREATENEWSPECIESREPLY._serialized_end=2468
  _CREATENEWCREATUREREQUEST._serialized_start=2470
  _CREATENEWCREATUREREQUEST._serialized_end=2584
  _CREATENEWCREATUREREPLY._serialized_start=2586
  _CREATENEWCREATUREREPLY._serialized_end=2635
  _GETSPECIESLISTREQUEST._serialized_start=2637
  _GETSPECIESLISTREQUEST._serialized_end=2660
  _GETSPECIESLISTREPLY._serialized_start=2662
  _GETSPECIESLISTREPLY._serialized_end=2700
  _DEFINENEWSPECIESRELATIONSHIPREQUEST._serialized_start=2702
  _DEFINENEWSPECIESRELATIONSHIPREQUEST._serialized_end=2812
  _DEFINENEWSPECIESRELATIONSHIPREPLY._serialized_start=2814
  _DEFINENEWSPECIESRELATIONSHIPREPLY._serialized_end=2877
  _GETSPECIESINFOREQUEST._serialized_start=2879
  _GETSPECIESINFOREQUEST._serialized_end=2929
  _GETCREATUREINFOREQUEST._serialized_start=2931
  _GETCREATUREINFOREQUEST._serialized_end=3000
  _CREATETOPOGRAPHYREQUEST._serialized_start=3002
  _CREATETOPOGRAPHYREQUEST._serialized_end=3070
  _CREATETOPOGRAPHYREPLY._serialized_start=3072
  _CREATETOPOGRAPHYREPLY._serialized_end=3120
  _DELETETOPOGRAPHYREQUEST._serialized_start=3122
  _DELETETOPOGRAPHYREQUEST._serialized_end=3176
  _DELETETOPOGRAPHYREPLY._serialized_start=3178
  _DELETETOPOGRAPHYREPLY._serialized_end=3228
  _TOPOGRAPHYINFO._serialized_start=3230
  _TOPOGRAPHYINFO._serialized_end=3316
  _TOPOGRAPHYROW._serialized_start=3318
  _TOPOGRAPHYROW._serialized_end=3372
  _TOPOGRAPHYTABLE._serialized_start=3374
  _TOPOGRAPHYTABLE._serialized_end=3428
  _GETTOPOGRAPHYREQUEST._serialized_start=3430
  _GETTOPOGRAPHYREQUEST._serialized_end=3452
  _SETTOPOGRAPHYREPLY._serialized_start=3454
  _SETTOPOGRAPHYREPLY._serialized_end=3497
  _TOPOGRAPHYTEMPLATEINFO._serialized_start=3500
  _TOPOGRAPHYTEMPLATEINFO._serialized_end=3668
  _DEFINETOPOGRAPHYTEMPLATEREPLY._serialized_start=3670
  _DEFINETOPOGRAPHYTEMPLATEREPLY._serialized_end=3724
  _GETTOPOGRAPHYTEMPLATESREQUEST._serialized_start=3726
  _GETTOPOGRAPHYTEMPLATESREQUEST._serialized_end=3757
  _GETTOPOGRAPHYTEMPLATESREPLY._serialized_start=3759
  _GETTOPOGRAPHYTEMPLATESREPLY._serialized_end=3825
  _ADVANCESIMULATIONREQUEST._serialized_start=3827
  _ADVANCESIMULATIONREQUEST._serialized_end=3877
  _ADVANCESIMULATIONREPLY._serialized_start=3879
  _ADVANCESIMULATIONREPLY._serialized_end=3931
  _GETTEXTTOGGLEREQUEST._serialized_start=3933
  _GETTEXTTOGGLEREQUEST._serialized_end=3955
  _GETTEXTTOGGLEREPLY._serialized_start=3957
  _GETTEXTTOGGLEREPLY._serialized_end=3997
  _UPDATETEXTTOGGLEREQUEST._serialized_start=3999
  _UPDATETEXTTOGGLEREQUEST._serialized_end=4047
  _UPDATETEXTTOGGLEREPLY._serialized_start=4049
  _UPDATETEXTTOGGLEREPLY._serialized_end=4093
  _GETUPDATEFLAGREQUEST._serialized_start=4095
  _GETUPDATEFLAGREQUEST._serialized_end=4117
  _GETUPDATEFLAGREPLY._serialized_start=4119
  _GETUPDATEFLAGREPLY._serialized_end=4159
  _EDITUPDATEFLAGREQUEST._serialized_start=4161
  _EDITUPDATEFLAGREQUEST._serialized_end=4207
  _EDITUPDATEFLAGREPLY._serialized_start=4209
  _EDITUPDATEFLAGREPLY._serialized_end=4251
  _GETTIMEOFSIMULATIONREQUEST._serialized_start=4253
  _GETTIMEOFSIMULATIONREQUEST._serialized_end=4281
  _GETTIMEOFSIMULATIONREPLY._serialized_start=4283
  _GETTIMEOFSIMULATIONREPLY._serialized_end=4335
  _GETLIGHTVISIBILITYREQUEST._serialized_start=4337
  _GETLIGHTVISIBILITYREQUEST._serialized_end=4364
  _GETLIGHTVISIBILITYREPLY._serialized_start=4366
  _GETLIGHTVISIBILITYREPLY._serialized_end=4416
  _BACKEND._serialized_start=4419
  _BACKEND._serialized_end=6804
# @@protoc_insertion_point(module_scope)
