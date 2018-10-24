# frozen_string_literal: true

RSpec.feature "Add new Sale", :js do
  background do
    visit root_path
    click_button "Adicionar negócio"
  end

  scenario "successfully" do
    within("form") do
      fill_in "Título do negócio", with: "MyNewSaleTitle"
      fill_in "Nome do cliente", with: "MyClientName"
      fill_in "R$ 0,00", with: 100_00

      find("img[alt='check']").click
    end

    within(".column", text: "Contato") do
      expect(page).to have_content("MyNewSaleTitle")
    end
  end

  scenario "unsuccessfully" do
    within("form") do
      fill_in "Nome do cliente", with: "MyClientName"
      fill_in "R$ 0,00", with: 100_00

      find("img[alt='check']").click
    end

    within(".column", text: "Contato") do
      expect(page).to have_css(".newSale .saleTitle input.error")
    end
  end
end
