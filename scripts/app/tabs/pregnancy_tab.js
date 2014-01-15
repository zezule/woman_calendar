define(['hbs!template/pregnancy_tab', 'app/boxes/pregnancy_box', 'app/tabs/tab', 'jquery', 'backbone'],
	function(pregnency_tab_tpl, PregnancyBox, Tab) {
		var PregnencyTab = Tab.extend({
			tab_tile_code: "pregnancy_tab",
			boxes: [],
			init_boxes: function() {
				this.boxes.push(new PregnancyBox());
			},
			render: function() {
				this.$el.append(pregnency_tab_tpl({}));
				this.init_boxes();
				this.$el.append(this.boxes[0].el);
				this.render_boxes();
			}
		});

		return PregnencyTab;
	});
// pobieram dane z ostatnich 4 miechow
//jak mam to wypelniam formularz danymi i wyliczam dni plodne -- formularz nie widoczny (nie wygladajacy jako formularz
//jak danych nie mam to wyswietlam dane domysle tzn. okres co 28 dzien otrzymania dzisiaj
//wyswietlam 3mc za pomoca jquery ui  i koloruje ladnie legend!

//http://www.kalendarzdniplodnych.pl/kalkulator.php
//http://dniplodne.org/

//rozwazyc wyslietlenie tabelki dl. cylku dni plodne
//informacja na temat dni plodnych w tym Notice ui