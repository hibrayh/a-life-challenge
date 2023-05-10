// source: backend_api.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.backend.GenomeInfo');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.backend.GenomeInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.backend.GenomeInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.backend.GenomeInfo.displayName = 'proto.backend.GenomeInfo';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.backend.GenomeInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.backend.GenomeInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.backend.GenomeInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.backend.GenomeInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    visibility: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    maxhealth: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    cansee: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    cansmell: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    canhear: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    sightability: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    smellability: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    hearingability: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0),
    sightrange: jspb.Message.getFloatingPointFieldWithDefault(msg, 9, 0.0),
    smellrange: jspb.Message.getFloatingPointFieldWithDefault(msg, 10, 0.0),
    hearingrange: jspb.Message.getFloatingPointFieldWithDefault(msg, 11, 0.0),
    reactiontime: jspb.Message.getFloatingPointFieldWithDefault(msg, 12, 0.0),
    impulsivity: jspb.Message.getFloatingPointFieldWithDefault(msg, 13, 0.0),
    selfpreservation: jspb.Message.getFloatingPointFieldWithDefault(msg, 14, 0.0),
    mobility: jspb.Message.getFloatingPointFieldWithDefault(msg, 15, 0.0),
    reproductiontype: jspb.Message.getFieldWithDefault(msg, 16, ""),
    reproductioncooldown: jspb.Message.getFloatingPointFieldWithDefault(msg, 17, 0.0),
    offspringamount: jspb.Message.getFloatingPointFieldWithDefault(msg, 18, 0.0),
    motivation: jspb.Message.getFloatingPointFieldWithDefault(msg, 19, 0.0),
    maxenergy: jspb.Message.getFloatingPointFieldWithDefault(msg, 20, 0.0),
    metabolism: jspb.Message.getFloatingPointFieldWithDefault(msg, 21, 0.0),
    individualism: jspb.Message.getFloatingPointFieldWithDefault(msg, 22, 0.0),
    territorial: jspb.Message.getFloatingPointFieldWithDefault(msg, 23, 0.0),
    fightorflight: jspb.Message.getFloatingPointFieldWithDefault(msg, 24, 0.0),
    hostility: jspb.Message.getFloatingPointFieldWithDefault(msg, 25, 0.0),
    scent: jspb.Message.getFloatingPointFieldWithDefault(msg, 26, 0.0),
    stealth: jspb.Message.getFloatingPointFieldWithDefault(msg, 27, 0.0),
    lifeexpectancy: jspb.Message.getFloatingPointFieldWithDefault(msg, 28, 0.0),
    maturity: jspb.Message.getFloatingPointFieldWithDefault(msg, 29, 0.0),
    offensiveability: jspb.Message.getFloatingPointFieldWithDefault(msg, 30, 0.0),
    defensiveability: jspb.Message.getFloatingPointFieldWithDefault(msg, 31, 0.0),
    effectfromhost: jspb.Message.getFloatingPointFieldWithDefault(msg, 32, 0.0),
    effectfromparasite: jspb.Message.getFloatingPointFieldWithDefault(msg, 33, 0.0),
    protecting: jspb.Message.getFloatingPointFieldWithDefault(msg, 34, 0.0),
    nurturing: jspb.Message.getFloatingPointFieldWithDefault(msg, 35, 0.0),
    effectfrombeingnurtured: jspb.Message.getFloatingPointFieldWithDefault(msg, 36, 0.0),
    shorttermmemoryaccuracy: jspb.Message.getFloatingPointFieldWithDefault(msg, 37, 0.0),
    shorttermmemorycapacity: jspb.Message.getFloatingPointFieldWithDefault(msg, 38, 0.0),
    shape: jspb.Message.getFieldWithDefault(msg, 39, ""),
    color: jspb.Message.getFieldWithDefault(msg, 40, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.backend.GenomeInfo}
 */
proto.backend.GenomeInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.backend.GenomeInfo;
  return proto.backend.GenomeInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.backend.GenomeInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.backend.GenomeInfo}
 */
proto.backend.GenomeInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setVisibility(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMaxhealth(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCansee(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCansmell(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCanhear(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSightability(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSmellability(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHearingability(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSightrange(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSmellrange(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHearingrange(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setReactiontime(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setImpulsivity(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setSelfpreservation(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMobility(value);
      break;
    case 16:
      var value = /** @type {string} */ (reader.readString());
      msg.setReproductiontype(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setReproductioncooldown(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setOffspringamount(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMotivation(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMaxenergy(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMetabolism(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setIndividualism(value);
      break;
    case 23:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setTerritorial(value);
      break;
    case 24:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setFightorflight(value);
      break;
    case 25:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setHostility(value);
      break;
    case 26:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setScent(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setStealth(value);
      break;
    case 28:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setLifeexpectancy(value);
      break;
    case 29:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMaturity(value);
      break;
    case 30:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setOffensiveability(value);
      break;
    case 31:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setDefensiveability(value);
      break;
    case 32:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setEffectfromhost(value);
      break;
    case 33:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setEffectfromparasite(value);
      break;
    case 34:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setProtecting(value);
      break;
    case 35:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setNurturing(value);
      break;
    case 36:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setEffectfrombeingnurtured(value);
      break;
    case 37:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setShorttermmemoryaccuracy(value);
      break;
    case 38:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setShorttermmemorycapacity(value);
      break;
    case 39:
      var value = /** @type {string} */ (reader.readString());
      msg.setShape(value);
      break;
    case 40:
      var value = /** @type {string} */ (reader.readString());
      msg.setColor(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.backend.GenomeInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.backend.GenomeInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.backend.GenomeInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.backend.GenomeInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVisibility();
  if (f !== 0.0) {
    writer.writeFloat(
      1,
      f
    );
  }
  f = message.getMaxhealth();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getCansee();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getCansmell();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getCanhear();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getSightability();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getSmellability();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getHearingability();
  if (f !== 0.0) {
    writer.writeFloat(
      8,
      f
    );
  }
  f = message.getSightrange();
  if (f !== 0.0) {
    writer.writeFloat(
      9,
      f
    );
  }
  f = message.getSmellrange();
  if (f !== 0.0) {
    writer.writeFloat(
      10,
      f
    );
  }
  f = message.getHearingrange();
  if (f !== 0.0) {
    writer.writeFloat(
      11,
      f
    );
  }
  f = message.getReactiontime();
  if (f !== 0.0) {
    writer.writeFloat(
      12,
      f
    );
  }
  f = message.getImpulsivity();
  if (f !== 0.0) {
    writer.writeFloat(
      13,
      f
    );
  }
  f = message.getSelfpreservation();
  if (f !== 0.0) {
    writer.writeFloat(
      14,
      f
    );
  }
  f = message.getMobility();
  if (f !== 0.0) {
    writer.writeFloat(
      15,
      f
    );
  }
  f = message.getReproductiontype();
  if (f.length > 0) {
    writer.writeString(
      16,
      f
    );
  }
  f = message.getReproductioncooldown();
  if (f !== 0.0) {
    writer.writeFloat(
      17,
      f
    );
  }
  f = message.getOffspringamount();
  if (f !== 0.0) {
    writer.writeFloat(
      18,
      f
    );
  }
  f = message.getMotivation();
  if (f !== 0.0) {
    writer.writeFloat(
      19,
      f
    );
  }
  f = message.getMaxenergy();
  if (f !== 0.0) {
    writer.writeFloat(
      20,
      f
    );
  }
  f = message.getMetabolism();
  if (f !== 0.0) {
    writer.writeFloat(
      21,
      f
    );
  }
  f = message.getIndividualism();
  if (f !== 0.0) {
    writer.writeFloat(
      22,
      f
    );
  }
  f = message.getTerritorial();
  if (f !== 0.0) {
    writer.writeFloat(
      23,
      f
    );
  }
  f = message.getFightorflight();
  if (f !== 0.0) {
    writer.writeFloat(
      24,
      f
    );
  }
  f = message.getHostility();
  if (f !== 0.0) {
    writer.writeFloat(
      25,
      f
    );
  }
  f = message.getScent();
  if (f !== 0.0) {
    writer.writeFloat(
      26,
      f
    );
  }
  f = message.getStealth();
  if (f !== 0.0) {
    writer.writeFloat(
      27,
      f
    );
  }
  f = message.getLifeexpectancy();
  if (f !== 0.0) {
    writer.writeFloat(
      28,
      f
    );
  }
  f = message.getMaturity();
  if (f !== 0.0) {
    writer.writeFloat(
      29,
      f
    );
  }
  f = message.getOffensiveability();
  if (f !== 0.0) {
    writer.writeFloat(
      30,
      f
    );
  }
  f = message.getDefensiveability();
  if (f !== 0.0) {
    writer.writeFloat(
      31,
      f
    );
  }
  f = message.getEffectfromhost();
  if (f !== 0.0) {
    writer.writeFloat(
      32,
      f
    );
  }
  f = message.getEffectfromparasite();
  if (f !== 0.0) {
    writer.writeFloat(
      33,
      f
    );
  }
  f = message.getProtecting();
  if (f !== 0.0) {
    writer.writeFloat(
      34,
      f
    );
  }
  f = message.getNurturing();
  if (f !== 0.0) {
    writer.writeFloat(
      35,
      f
    );
  }
  f = message.getEffectfrombeingnurtured();
  if (f !== 0.0) {
    writer.writeFloat(
      36,
      f
    );
  }
  f = message.getShorttermmemoryaccuracy();
  if (f !== 0.0) {
    writer.writeFloat(
      37,
      f
    );
  }
  f = message.getShorttermmemorycapacity();
  if (f !== 0.0) {
    writer.writeFloat(
      38,
      f
    );
  }
  f = message.getShape();
  if (f.length > 0) {
    writer.writeString(
      39,
      f
    );
  }
  f = message.getColor();
  if (f.length > 0) {
    writer.writeString(
      40,
      f
    );
  }
};


/**
 * optional float visibility = 1;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getVisibility = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setVisibility = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional float maxHealth = 2;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMaxhealth = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMaxhealth = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional bool canSee = 3;
 * @return {boolean}
 */
proto.backend.GenomeInfo.prototype.getCansee = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setCansee = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool canSmell = 4;
 * @return {boolean}
 */
proto.backend.GenomeInfo.prototype.getCansmell = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setCansmell = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool canHear = 5;
 * @return {boolean}
 */
proto.backend.GenomeInfo.prototype.getCanhear = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setCanhear = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional float sightAbility = 6;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getSightability = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setSightability = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float smellAbility = 7;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getSmellability = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setSmellability = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * optional float hearingAbility = 8;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getHearingability = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setHearingability = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


/**
 * optional float sightRange = 9;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getSightrange = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 9, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setSightrange = function(value) {
  return jspb.Message.setProto3FloatField(this, 9, value);
};


/**
 * optional float smellRange = 10;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getSmellrange = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 10, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setSmellrange = function(value) {
  return jspb.Message.setProto3FloatField(this, 10, value);
};


/**
 * optional float hearingRange = 11;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getHearingrange = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 11, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setHearingrange = function(value) {
  return jspb.Message.setProto3FloatField(this, 11, value);
};


/**
 * optional float reactionTime = 12;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getReactiontime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 12, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setReactiontime = function(value) {
  return jspb.Message.setProto3FloatField(this, 12, value);
};


/**
 * optional float impulsivity = 13;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getImpulsivity = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 13, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setImpulsivity = function(value) {
  return jspb.Message.setProto3FloatField(this, 13, value);
};


/**
 * optional float selfPreservation = 14;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getSelfpreservation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 14, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setSelfpreservation = function(value) {
  return jspb.Message.setProto3FloatField(this, 14, value);
};


/**
 * optional float mobility = 15;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMobility = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 15, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMobility = function(value) {
  return jspb.Message.setProto3FloatField(this, 15, value);
};


/**
 * optional string reproductionType = 16;
 * @return {string}
 */
proto.backend.GenomeInfo.prototype.getReproductiontype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 16, ""));
};


/**
 * @param {string} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setReproductiontype = function(value) {
  return jspb.Message.setProto3StringField(this, 16, value);
};


/**
 * optional float reproductionCooldown = 17;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getReproductioncooldown = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 17, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setReproductioncooldown = function(value) {
  return jspb.Message.setProto3FloatField(this, 17, value);
};


/**
 * optional float offspringAmount = 18;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getOffspringamount = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 18, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setOffspringamount = function(value) {
  return jspb.Message.setProto3FloatField(this, 18, value);
};


/**
 * optional float motivation = 19;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMotivation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 19, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMotivation = function(value) {
  return jspb.Message.setProto3FloatField(this, 19, value);
};


/**
 * optional float maxEnergy = 20;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMaxenergy = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 20, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMaxenergy = function(value) {
  return jspb.Message.setProto3FloatField(this, 20, value);
};


/**
 * optional float metabolism = 21;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMetabolism = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 21, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMetabolism = function(value) {
  return jspb.Message.setProto3FloatField(this, 21, value);
};


/**
 * optional float individualism = 22;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getIndividualism = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 22, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setIndividualism = function(value) {
  return jspb.Message.setProto3FloatField(this, 22, value);
};


/**
 * optional float territorial = 23;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getTerritorial = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 23, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setTerritorial = function(value) {
  return jspb.Message.setProto3FloatField(this, 23, value);
};


/**
 * optional float fightOrFlight = 24;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getFightorflight = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 24, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setFightorflight = function(value) {
  return jspb.Message.setProto3FloatField(this, 24, value);
};


/**
 * optional float hostility = 25;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getHostility = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 25, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setHostility = function(value) {
  return jspb.Message.setProto3FloatField(this, 25, value);
};


/**
 * optional float scent = 26;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getScent = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 26, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setScent = function(value) {
  return jspb.Message.setProto3FloatField(this, 26, value);
};


/**
 * optional float stealth = 27;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getStealth = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 27, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setStealth = function(value) {
  return jspb.Message.setProto3FloatField(this, 27, value);
};


/**
 * optional float lifeExpectancy = 28;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getLifeexpectancy = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 28, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setLifeexpectancy = function(value) {
  return jspb.Message.setProto3FloatField(this, 28, value);
};


/**
 * optional float maturity = 29;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getMaturity = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 29, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setMaturity = function(value) {
  return jspb.Message.setProto3FloatField(this, 29, value);
};


/**
 * optional float offensiveAbility = 30;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getOffensiveability = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 30, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setOffensiveability = function(value) {
  return jspb.Message.setProto3FloatField(this, 30, value);
};


/**
 * optional float defensiveAbility = 31;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getDefensiveability = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 31, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setDefensiveability = function(value) {
  return jspb.Message.setProto3FloatField(this, 31, value);
};


/**
 * optional float effectFromHost = 32;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getEffectfromhost = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 32, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setEffectfromhost = function(value) {
  return jspb.Message.setProto3FloatField(this, 32, value);
};


/**
 * optional float effectFromParasite = 33;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getEffectfromparasite = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 33, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setEffectfromparasite = function(value) {
  return jspb.Message.setProto3FloatField(this, 33, value);
};


/**
 * optional float protecting = 34;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getProtecting = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 34, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setProtecting = function(value) {
  return jspb.Message.setProto3FloatField(this, 34, value);
};


/**
 * optional float nurturing = 35;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getNurturing = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 35, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setNurturing = function(value) {
  return jspb.Message.setProto3FloatField(this, 35, value);
};


/**
 * optional float effectFromBeingNurtured = 36;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getEffectfrombeingnurtured = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 36, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setEffectfrombeingnurtured = function(value) {
  return jspb.Message.setProto3FloatField(this, 36, value);
};


/**
 * optional float shortTermMemoryAccuracy = 37;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getShorttermmemoryaccuracy = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 37, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setShorttermmemoryaccuracy = function(value) {
  return jspb.Message.setProto3FloatField(this, 37, value);
};


/**
 * optional float shortTermMemoryCapacity = 38;
 * @return {number}
 */
proto.backend.GenomeInfo.prototype.getShorttermmemorycapacity = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 38, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setShorttermmemorycapacity = function(value) {
  return jspb.Message.setProto3FloatField(this, 38, value);
};


/**
 * optional string shape = 39;
 * @return {string}
 */
proto.backend.GenomeInfo.prototype.getShape = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 39, ""));
};


/**
 * @param {string} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setShape = function(value) {
  return jspb.Message.setProto3StringField(this, 39, value);
};


/**
 * optional string color = 40;
 * @return {string}
 */
proto.backend.GenomeInfo.prototype.getColor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 40, ""));
};


/**
 * @param {string} value
 * @return {!proto.backend.GenomeInfo} returns this
 */
proto.backend.GenomeInfo.prototype.setColor = function(value) {
  return jspb.Message.setProto3StringField(this, 40, value);
};


