import norm/[model, sqlite]
import ../genericArticleRepository
import organizationModel
import ../image/[imageModel, imageService]
import tinypool

export organizationModel


proc getOrganizationById*(organizationId: int64): OrganizationSerializable =
    let organization = getEntryById(organizationId, OrganizationRead)
    let images = getArticleImage(ImageType.ORGANIZATIONTYPE, organizationId)
    let members = getManyFromOne(organization, OrganizationCharacter)

    result = OrganizationSerializable(
        organization: organization,
        images: images,
        members: members
    )
