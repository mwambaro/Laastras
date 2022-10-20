# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# __start__ seeding laastras_documents
    docs = [
        {
            sha256: '31AA643CFA2706D6C9B00AB8623652CEA848622095D4959C912FC36922F8E9C6',
            title: 'Cover-Letter-Public-Relations__English (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Cover-Letter-Public-Relations__English.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '33C86A7C60B726707A257AD4FA50CADDF791D404EDED1FA73C016BCF71EF5436',
            title: 'Cover-Letter-Public-Relations__English (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Cover-Letter-Public-Relations__English.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: '0C78F97D01415A3B8552DD6DDB7539195E823F635577E55A26E6D3A4B4C320A8',
            title: 'Cover-Letter-Public-Relations__French (.docx)',
            language: 'fr_FR',
            uri: ApplicationHelper.document_asset_url(
                'Cover-Letter-Public-Relations__French.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: 'F05511B6E7F2586E9860ADE3160158F4ED85D28CA73A555ABB6AD102D1A89456',
            title: 'Cover-Letter-Public-Relations__French (.pdf)',
            language: 'fr_FR',
            uri: ApplicationHelper.document_asset_url(
                'Cover-Letter-Public-Relations__French.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: '1B69AA5A631E79BF6FA93863C03C122441E7A52DF11CC18A1F849F9A8757FE1B',
            title: 'Job-Offer-Description (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Job-Offer-Description.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '7538F641ACE968A1B4046213847828D7C08F2B9DC34BD90D73CC0213BFACD1D6',
            title: 'Job-Offer-Description (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Job-Offer-Description.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: '8B434CF7A7A658ED24BAD9CE0DFD308545E91921D2098DB736876F2CFE2C4790',
            title: 'Laastras-organization-mission-book (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Laastras-organization-mission-book.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '001B6512DC363F772364FC7FE2E25D2BDF5E3125ECCCA57EB0DD8DA57E096739',
            title: 'Laastras-organization-mission-book (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Laastras-organization-mission-book.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: 'B9C1999A86326E370ABF5C971A00EBE4FE2F75E4ED88A7992372909BD63A2B46',
            title: 'Laastras-Specification (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Laastras-Specification.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '6B4064066E25B8201C7C2769D826089F67B0D3C1369DAEB1A2209FCFB6B8B09C',
            title: 'Laastras-Specification (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'Laastras-Specification.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: '79B25BF32D33289C8D39CB656DA1BED6BADDD869DEC63B186A8C2AE69373DF98',
            title: 'project-management-blue-print (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'project-management-blue-print.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '4FBAFE7D0A728FFFA6646FB2495FE8940830B253A1C9D7FE1859CE5080946850',
            title: 'project-management-blue-print (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'project-management-blue-print.pdf'
            ),
            mime_type: 'application/pdf'
        },
        {
            sha256: 'D2C5A22801A6E242B73B8B66C979DD708B970303A8ABCA6BC6213746DD7763A0',
            title: 'README (.docx)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'README.docx'
            ),
            mime_type: 'application/docx'
        },
        {
            sha256: '1C76F943B12FC398420ED4EA75DA567F1E77419E2772757DA85CA77B2580033C',
            title: 'README (.pdf)',
            language: 'en_US',
            uri: ApplicationHelper.document_asset_url(
                'README.pdf'
            ),
            mime_type: 'application/pdf'
        }
    ]

    LaastrasDocument.create(docs) 
# __end__

# __start__ seeding job_offers
    job_offers = []
    original_language = I18n.locale
    I18n.available_locales.each do |lang|
        I18n.locale = lang.to_sym
        job_offers << {  
            title: (I18n.t 'project_manager_assistant'),
            description: (I18n.t 'project_manager_assistant_offer'),
            language: lang.to_s,
            application_uri: nil           
        }
        job_offers << {  
            title: (I18n.t 'venture_capital_professional'),
            description: (I18n.t 'venture_capital_professional_offer'),
            language: lang.to_s,
            application_uri: nil           
        }   
        job_offers << {  
            title: (I18n.t 'ngo_chief_of_mission'),
            description: (I18n.t 'ngo_chief_of_mission_job_offer'),
            language: lang.to_s,
            application_uri: nil           
        } 
        job_offers << {  
            title: (I18n.t 'head_of_state_or_prime_minister'),
            description: (I18n.t 'head_of_state_or_prime_minister_job_offer'),
            language: lang.to_s,
            application_uri: nil           
        }
        # add more job offers below
    end
    I18n.locale = original_language

    LaastrasJobOffer.create(job_offers)
# __end__

# __start__ seeding laastras_mature_videos
    mature_videos = [
        {
            sha256: '76C369CDC61F563B1658D78BF5C3C81D4532C80B4316FD97E551BF5B2AB31413',
            title: 'Fucking HoneyDippedC for breakfast.mp4',
            uri: ApplicationHelper.mature_video_asset_url(
                'Fucking HoneyDippedC for breakfast.mp4'
            ),
            mime_type: 'video/mp4'
        },
        {
            sha256: '97BEC4E299A061A297D7D3B060B9299A915CC2C3D607DAF5406B568752DA4149',
            title: 'Mom cheating milf plays away.mp4',
            uri: ApplicationHelper.mature_video_asset_url(
                'Mom cheating milf plays away.mp4'
            ),
            mime_type: 'video/mp4'
        },
        {
            sha256: '179E06F67F2CE5FB7C1BA0E9BDC03818CB474E8127999DE834941867B723CA23',
            title: 'Mom mature milf takes charge of her man.mp4',
            uri: ApplicationHelper.mature_video_asset_url(
                'Mom mature milf takes charge of her man.mp4'
            ),
            mime_type: 'video/mp4'
        }
    ]

    LaastrasMatureVideo.create(mature_videos)
# __end__
