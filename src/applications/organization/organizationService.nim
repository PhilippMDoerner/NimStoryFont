import norm/[model, sqlite]
import ../genericArticleRepository
import organizationModel
import ../image/[imageModel, imageService]
import tinypool

export organizationModel

proc getOrganizationList*(): seq[OrganizationRead] =
    result = getList[OrganizationRead]()


proc getOrganizationById*(organizationId: int64): OrganizationSerializable =
    let organization = getEntryById[OrganizationRead](organizationId)
    let images = getArticleImage(ImageType.ORGANIZATIONTYPE, organizationId)
    let members = getManyFromOne(organization, OrganizationCharacter)

    result = OrganizationSerializable(
        organization: organization,
        images: images,
        members: members
    )


proc deleteOrganization*(organizationId: int64) =
    deleteEntry[Organization](organizationId)


proc updateOrganization*(organizationId: int64, organizationJsonData: string): OrganizationSerializable =
    let organization = updateArticleEntry[Organization](organizationId, organizationJsonData)
    result = getOrganizationById(organization.id)


proc createOrganization*(organizationJsonData: string): OrganizationSerializable =
    let organization = createArticleEntry(organizationJsonData, Organization)
    result = getOrganizationById(organization.id)