# frozen_string_literal: true

json.extract! @user,
  :email,
  :first_name,
  :last_name

json.attempt do
  json.extract! @attempt,
    :submitted,
    :id
end
