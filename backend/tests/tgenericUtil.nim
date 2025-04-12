import ../src/applications/genericUtils
import std/[unittest, logging, typetraits]
import norm/[pragmas, model]

suite "getRelatedFieldNameOn":
  setup:
    type A = ref object of Model
      name: string
    
    type B = ref object of Model
      fk1 {.fk: A.}: int64
      fk2 {.fk: A.}: int64
  
    type C = ref object of Model
      fk1 {.fk: A.}: int64

  test "Given a model with 1 FK on another model, When getting relatedFieldNameOn, Then compile":
    check compiles(A.getRelatedFieldNameOn(C)) == true
    check A.getRelatedFieldNameOn(C) == "fk1"
  
  test "Given a model with 2 FK on another model, When getting relatedFieldNameOn, Then don't compile":
    check compiles(A.getRelatedFieldNameOn(B)) == false