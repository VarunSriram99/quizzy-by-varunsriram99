# frozen_string_literal: true

Sidekiq.configure_client do |config|
  config.redis = { url: "redis://:p8a5f24ca021be2f288df3b9e3244b01bb6f3ef730fba1368e5fef92464501c0d@ec2-23-20-220-53.compute-1.amazonaws.com:23619", size: 4, network_timeout: 5 }
end

Sidekiq.configure_server do |config|
  config.redis = { url: "redis://:p8a5f24ca021be2f288df3b9e3244b01bb6f3ef730fba1368e5fef92464501c0d@ec2-23-20-220-53.compute-1.amazonaws.com:23619", size: 4, network_timeout: 5 }
end
