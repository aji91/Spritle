class Project < ApplicationRecord
  belongs_to :user

  scope :open_projects, -> { where(status: 'opened') }
  scope :closed_projects, -> { where(status: 'closed') }
end
