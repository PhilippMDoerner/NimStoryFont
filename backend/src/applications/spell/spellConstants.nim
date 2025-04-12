import std/strutils
import jsony
import norm/sqlite

type SavingThrow* = enum
  stATTACK = "ATK",
  stSTRENGTH = "STR",
  stCONSTITUTION = "CON",
  stDEXTERITY = "DEX",
  stINTELLIGENCE = "INT",
  stWISDOM = "WIS",
  stCHARISMA = "CHA"

func dbType*(T: typedesc[SavingThrow]): string = "TEXT"
func dbValue*(val: SavingThrow): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[SavingThrow]): T = parseEnum[SavingThrow](dbVal.s)

proc dumpHook*(s: var string, value: SavingThrow) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var SavingThrow) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[SavingThrow](str)


type SpellLevel* = enum
  slCANTRIP = 0
  slLEVEL1 = 1,
  slLEVEL2 = 2,
  slLEVEL3 = 3,
  slLEVEL4 = 4,
  slLEVEL5 = 5,
  slLEVEL6 = 6,
  slLEVEL7 = 7,
  slLEVEL8 = 8,
  slLEVEL9 = 9

func dbType*(T: typedesc[SpellLevel]): string = "INT"
func dbValue*(val: SpellLevel): DbValue = dbValue(val.int)
proc to*(dbVal: DbValue, T: typedesc[SpellLevel]): T = SpellLevel(dbVal.i)

proc dumpHook*(s: var string, value: SpellLevel) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add $value.int

proc parseHook*(s: string, i: var int, v: var SpellLevel) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var level: int
    s.parseHook(i, level)
    v = SpellLevel(level)

type CastingTime* = enum
  ctACTION = "1 Action",
  ctBONUSACTION = "1 Bonus Action",
  ctREACTION = "1 Reaction",
  ctMINUTE = "1 Minute",
  ctTENMINUTES = "10 Minutes",
  ctHOUR = "1 Hour",
  ctEIGHTHOURS = "8 Hours",
  ctTWELVEHOURS = "12 Hours",
  ctDAY = "24 Hours"

func dbType*(T: typedesc[CastingTime]): string = "TEXT"
func dbValue*(val: CastingTime): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[CastingTime]): T = parseEnum[CastingTime](dbVal.s)

proc dumpHook*(s: var string, value: CastingTime) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var CastingTime) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[CastingTime](str)


type SpellDuration* = enum
  sdINSTANT = "Instantaneous",
  sdROUND = "1 Round",
  sdSIXROUNDS = "6 Rounds",
  sdMINUTE = "1 Minute",
  sdTENMINUTES = "10 Minutes",
  sdHOUR = "1 Hour",
  sdTWOHOURS = "2 Hours",
  sdEIGHTHOURS = "8 Hours",
  sdDAY = "1 Day",
  sdWEEK = "7 Days",
  sdTENDAYS = "10 Days",
  sdMONTH = "30 Days",
  sdSPECIAL = "Special",
  sdUNTILDISPELLED = "Until Dispelled"

func dbType*(T: typedesc[SpellDuration]): string = "TEXT"
func dbValue*(val: SpellDuration): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[SpellDuration]): T = parseEnum[SpellDuration](dbVal.s)

proc dumpHook*(s: var string, value: SpellDuration) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var SpellDuration) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[SpellDuration](str)


type Range* = enum
  rSELF = "Self",
  rFEET5 = "5 Feet",
  rFEET10 = "10 Feet",
  rFEET15 = "15 Feet",
  rFEET30 = "30 Feet",
  rFEET60 = "60 Feet",
  rFEET90 = "90 Feet",
  rFEET100 = "100 Feet",
  rFEET120 = "120 Feet",
  rFEET150 = "150 Feet",
  rMILE = "1 Mile",
  rMILE3 = "3 Miles",
  rMILE10 = "10 Miles"

func dbType*(T: typedesc[Range]): string = "TEXT"
func dbValue*(val: Range): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[Range]): T = parseEnum[Range](dbVal.s)

proc dumpHook*(s: var string, value: Range) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var Range) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[Range](str)


type SpellComponents* = enum
  scV, scS, scM, scVS, scVM, scSM, scVSM, scVSMS = "VSM*"

func dbType*(T: typedesc[SpellComponents]): string = "TEXT"
func dbValue*(val: SpellComponents): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[SpellComponents]): T = parseEnum[SpellComponents](dbVal.s)

proc dumpHook*(s: var string, value: SpellComponents) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var SpellComponents) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[SpellComponents](str)


type MagicSchool* = enum
  msABJURATION = "Abjuration",
  msCONJURATION = "Conjuration",
  msDIVINATION = "Divination",
  msENCHANTMENT = "Enchantment",
  msEVOCATION = "Evocation",
  msILLUSION = "Illusion",
  msNECROMANCY = "Necromancy",
  msTRANSMUTATION = "Transmutation"

func dbType*(T: typedesc[MagicSchool]): string = "TEXT"
func dbValue*(val: MagicSchool): DbValue = dbValue($val)
proc to*(dbVal: DbValue, T: typedesc[MagicSchool]): T = parseEnum[MagicSchool](dbVal.s)

proc dumpHook*(s: var string, value: MagicSchool) =
    ##[ jsony-Hook that is automatically called to convert SpellLevel to json string

    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add $value
    s.add '"'


proc parseHook*(s: string, i: var int, v: var MagicSchool) =
    ##[ jsony-hook that is automatically called to convert a json-string to SpellLevel

    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseEnum[MagicSchool](str)
