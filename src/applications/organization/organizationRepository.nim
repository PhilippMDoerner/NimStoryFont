import ../../utils/database
import norm/[model, sqlite]
import ../base_generics/genericArticleRepository
import organizationModel
import ../image/[imageModel, imageRepository]


proc getOrganizationList*(): seq[OrganizationRead] =
    result = getList[OrganizationRead]()


proc getOrganizationById*(organizationId: int64): OrganizationSerializable =
    let organization = getEntryById[OrganizationRead](organizationId)
    let images = getArticleImage(ImageType.ORGANIZATIONTYPE, organizationId)
    let members = 

    result = OrganizationSerializable(
        organization: organization,
        images: images,

    )



proc deleteOrganization*(organizationId: int64) =
    deleteEntry[Organization](organizationId)


proc updateOrganization*(organizationId: int64, organizationJsonData: string): OrganizationRead =
    result = updateEntry[Organization, OrganizationRead](organizationId, organizationJsonData)


proc createOrganization*(organizationJsonData: string): OrganizationRead =
    result = createArticleEntry[Organization, OrganizationRead](organizationJsonData)
