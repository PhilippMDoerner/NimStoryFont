import norm/[sqlite]
import std/[strformat, strutils, options, base64]
import ../src/applications/user/userModel
import ../src/database
import ../src/applications/[genericArticleRepository]

## This file changed hashes of users previously generated via custom formatting
## pre 02.02.2023 into the string format used by nimword


proc fixHash(encodedHash: string): string =
  var sections = encodedHash.split('$')
  assert sections.len == 4, fmt"Got these sections: '{sections}' for '{encodedHash}'"
  let algorithm = sections[0]
  let iterations = sections[1]
  let salt = sections[2]
  var encodedSalt = salt.encode()
  encodedSalt.removeSuffix('=')
  var hash = sections[3] 
  hash.removeSuffix('=')
  result = fmt"${algorithm}${iterations}${encodedSalt}${hash}"


initConnectionPool("/home/philipp/dev/nimstoryfont/db.sqlite3", 5)

withDbConn(connection):
  let users = connection.getList(User)
  for user in users:
    var updateUser = user
    updateUser.password = user.password.fixHash()
    connection.update(updateUser)