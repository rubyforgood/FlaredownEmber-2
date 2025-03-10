class AddGlobalToFoodsAndTags < ActiveRecord::Migration[7.1]
  def change
    add_column :foods, :global, :boolean, default: true
    add_column :tags, :global, :boolean, default: true
  end
end
