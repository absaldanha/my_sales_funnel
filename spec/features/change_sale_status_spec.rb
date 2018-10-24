# frozen_string_literal: true

RSpec.feature "Change Sale status", :js do
  before do
    create(:sale, title: "Sale to be moved")
    create(:sale, title: "Sale that will not move")
  end

  background do
    visit root_path
  end

  scenario "successfully" do
    sale_to_move = page.find(".sale", match: :first)
    follow_up_column = page.find(".column", text: "Follow-up")

    sale_to_move.drag_to(follow_up_column)

    within(follow_up_column) do
      expect(page).to have_content("Sale to be moved")
      expect(page).not_to have_content("Sale that will not move")
    end
  end
end
