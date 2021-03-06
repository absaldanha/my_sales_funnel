# frozen_string_literal: true

RSpec.feature "Change Sale status", :js do
  before do
    create(:sale, title: "Sale to be moved")
    create(:sale, title: "Sale that will not move")
    create(:sale, :won, title: "Won Sale")
  end

  background do
    visit root_path
  end

  scenario "Sale moved successfully" do
    sale_to_move = page.find(".sale", text: "Sale to be moved")
    follow_up_column = page.find(".column", text: "Follow-up")

    sale_to_move.drag_to(follow_up_column)

    within(follow_up_column) do
      expect(page).to have_content("Sale to be moved")
      expect(page).not_to have_content("Sale that will not move")
    end
  end

  scenario "Won sale moved to other columns besides Perdidos" do
    sale_to_move = page.find(".sale", text: "Won Sale")
    follow_up_column = page.find(".column", text: "Follow-up")

    sale_to_move.drag_to(follow_up_column)

    expect(page).to have_content("Um negócio ganho não pode ser movido para Follow-up")
  end

  scenario "Won sale moved to Perdidos column" do
    sale_to_move = page.find(".sale", text: "Won Sale")
    lost_column = page.find(".column", text: "Perdidos")

    sale_to_move.drag_to(lost_column)

    within(lost_column) do
      expect(page).to have_content("Won Sale")
    end
  end
end
