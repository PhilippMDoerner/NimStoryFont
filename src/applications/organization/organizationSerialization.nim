import organizationModel
import norm/sqlite
import ../genericArticleRepository
import organizationService
import ../image/[imageModel, imageService]


type OrganizationOverviewSerializable* = OrganizationOverview


proc serializeOrganizationRead*(connection: DbConn, entry: OrganizationRead): OrganizationSerializable =
    let images = getArticleImage(ImageType.ORGANIZATIONTYPE, entry.id)
    let members = connection.getManyFromOne(entry, OrganizationCharacter)

    result = OrganizationSerializable(
        organization: entry,
        images: images,
        members: members
    )

proc serializeOrganization*(connection: DbConn, entry: Organization): OrganizationSerializable =
    let fullEntry = connection.getEntryById(entry.id, OrganizationRead)
    result = connection.serializeOrganizationRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: OrganizationOverview): OrganizationOverviewSerializable =
    result = entry
