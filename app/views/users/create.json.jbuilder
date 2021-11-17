# frozen_string_literal: true

json.extract! @user,
  :email,
  :first_name,
  :last_name,
  :authentication_token,
  :role

json.attempt do
  json.extract! @attempt,
    :submitted,
    :id
end
