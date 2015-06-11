# == Schema Information
#
# Table name: barbers
#
#  id                            :integer          not null, primary key
#  shop_id                       :integer          not null
#  name                          :string           not null
#  rating                        :float            default(5.0), not null
#  personal_picture_file_name    :string
#  personal_picture_content_type :string
#  personal_picture_file_size    :integer
#  personal_picture_updated_at   :datetime
#  created_at                    :datetime
#  updated_at                    :datetime
#

class Barber < ActiveRecord::Base
  validates :name, :rating, presence: true
  validates_inclusion_of :rating, {in: 0..5 }
  has_many :portfolio_pictures, as: :imageable, dependent: :destroy

  belongs_to :shop
  has_attached_file :personal_picture,
      :styles => { :med => "300x300>", :thumb => "100x100>" },
      :default_url => "/images/:style/missing.png"
      :storage => :s3,
      :s3_credentials => Proc.new{|a| a.instance.s3_credentials }

  validates_attachment_content_type :personal_picture,
      :content_type => /\Aimage\/.*\Z/,
      size: { in: 0..3.megabytes }

  def s3_credentials
    bucket_loc = Rails.env.production? ? ENV'S3_BUCKET_NAME'] : ENV['DEV_S3_BUCKET_NAME']

   { bucket: bucket_loc,
    access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'] }
  end


end