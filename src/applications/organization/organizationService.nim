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


proc getOrganizationSerialization*(connection: DbConn, entry: Organization): OrganizationSerializable =
    result = getOrganizationById(entry.id)


proc getCampaignOrganizationList*(campaignName: string): seq[OrganizationOverview] =
    result = getCampaignList(campaignName, OrganizationOverview)


proc getOrganizationByName*(campaignName: string, entryName: string): OrganizationSerializable = 
    let entry = getEntryByName(campaignName, entryName, OrganizationOverview)
    result = getOrganizationById(entry.id)