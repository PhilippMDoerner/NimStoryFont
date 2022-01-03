import jsony
import djangoDateTimeType

proc dumpHook*(s: var string, value: DjangoDateTime) =
    ##[ jsony-Hook that is automatically called to convert DjangoDateTime to string 
    
    ``s``: The string containing the current serialization. ONLY APPEND TO THIS STRING
    ``value``: The value you want to convert to a string]##
    s.add '"'
    s.add value.format()
    s.add '"'

proc parseHook*(s: string, i: var int, v: var DjangoDateTime) =
    ##[ jsony-hook that is automatically called to convert a json-string to datetime
    
    ``s``: The full JSON string that needs to be serialized. Your type may only be a part of this
    ``i``: The index on the JSON string where the next section of it starts that needs to be serialized here
    ``v``: The variable to fill with a proper value]##
    var str: string
    s.parseHook(i, str)
    v = parseDefault(str)