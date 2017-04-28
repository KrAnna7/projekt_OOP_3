// plik scripts.js
$(function(){
	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	function Column(name){
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
		// Tworzenie elementów składowych kolumny
			var $column = $('<div>').addClass('column col-sm-3 col-xs-11');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('X Usuń kolumnę');
			var $columnAddCard = $('<button>').addClass('add-card btn-info').text('Dodaj kartę');

		// Podpinanie odpowiednich zdarzeń
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function(event) {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});
		// Konstruowanie elementu kolumny
			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

		// Zwracanie stworzonej kolumny
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element); // skąd się wzięło card.$element?
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
		// tworzenie elementów składowych karty
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-descrition').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('X Usuń kartę');

		// Podpinanie odpowiednich zdarzeń
			$cardDelete.click(function() {
				self.removeCard();
			});
		// Konstruowanie elementów karty
			$card.append($cardDelete)
				.append($cardDescription);
		// Zwracanie stworzonej karty
			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	function Board(name){ // klasa Board nie działa
		var self = this;

		this.id = randomString();
		this.title = title;
		this.$element = createBoard();

		function createBoard() {
		// Tworzenie elementów składowych tablicy
			var $board = $('<div>').addClass('board');
			var $boardTitle = $('<h1>').addClass('board-title').text(self.name);
			var $boardColumnContainer = $('<div>').addClass('column-container');
			var $boardDelete = $('<button>').addClass('btn-delete').text('X Usuń tablicę');
			var $boardAddColumn = $('<button>').addClass('add-column').text('Dodaj kolumnę');

		// Podpinanie odpowiednich zdarzeń
			$boardDelete.click(function() {
				self.removeBoard();
			});
			$boardAddColumn.click(function(event) {
				self.addColumn(new Column(prompt('Wpisz nazwę kolumny')));
			});
		// Konstruowanie elementu tablicy
			$board.append($boardTitle)
				.append($boardDelete)
				.append($boardAddColumn)
				.append($boardColumnContainer);

		// Zwracanie stworzonej kolumny
			return $board;
		}

	}

	Board.prototype = {// nie działa?
		removeBoard: function() {
			this.$element.remove()
		},
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-column').click(function(){
		var name = prompt('Wpisz nazwę kolumny');
		var column = new Column(name);
		board.addColumn(column);
	});

	// Tworzenie kolumn
	var toDoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

	// Dodawanie kolumn do tablicy
	board.addColumn(toDoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	//Tworzenie nowych egzemplarzy kart
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyć tablice Kanban');

	//Dodawanie kart do kolumn
	toDoColumn.addCard(card1);
	doingColumn.addCard(card2);

	//Tworzenie nowej tablicy
	var newBoard = new Board('Nowa tablica'); // nie działa
});