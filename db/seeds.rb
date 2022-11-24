# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

@seeds = ApplicationHelper::Seeds.new

# __start__ seeding users_database_before_reset
    env = Rails.env 
    if true # env.match? /\Adevelopment\Z/i
       # users = @seeds.seeding_users_database_before_reset
    end
# __end__

# __start__ seeding laastras_documents
    docs = @seeds.seeding_laastras_documents
# __end__

# __start__ seeding job_offers
    job_offers = @seeds.seeding_job_offers
# __end__

# __start__ seeding laastras_mature_videos
    mature_videos = @seeds.seeding_laastras_mature_videos
# __end__

# __start__ seeding laastras_marketing_videos
    marketing_videos = @seeds.seeding_laastras_marketing_videos
# __end__

# __start__ seeding laastras_milestone_element_images
    milestone_images = @seeds.seeding_laastras_milestone_element_images
# __end__

# __start__ seeding laastras_crm_strategies
    strategies = @seeds.seeding_laastras_crm_strategies
# __end__

# __start__ seeding laastras_contracts
    contracts = @seeds.seeding_laastras_contracts
# __end__

# __start__ seeding laastras_marketing_images
    marketing_images = @seeds.seeding_laastras_marketing_images
# __end__
