(function() {

	var upperLevel, certain, stopEach, arrCurrencies, arrMethods, arrSystems, 
		way = true,
		part = true,
		arrCurrencies = [];
  
	var app = {

		initialize : function () {	
			this.request();
			app.disabled ("#method","#caretMethod")
		},

		request : function () {
		    $.ajax({
			    dataType: "json",
			    url: 'https://test-play-ground.firebaseio.com/.json',
			    success: function  (data) {
				    upperLevel = data.systems;
				    app.add(upperLevel,'#system');
				    app.eachWrapper ('load');
			    }
		    });
		},

		add : function (x,id) {

	        $.each(x,  function(ind, val)   {

		        if (id == '#system' || id == "#method") {
		        	app.optionAdd ( x[ind].id , x[ind].name , id )
		        }else if (id = '#currency')
		        	app.optionAdd ( x[ind] , x[ind] , id )
	        });
      	},

		searchiInSystems : function () {
			way = true;

			$.each(upperLevel, function (ind) {

				if (upperLevel[ind].id==$('#system').val()){
					certain = upperLevel[ind].methods;
					app.add(certain,'#method');         
				}
			})
		},

		searchiInMethods : function () {
			part = false;

			$.each(certain, function (ind){

				if (certain[ind].id==$('#method').val()){
					app.add(certain[ind].currencies,'#currency');         
				}
			})
		},

    	eachWrapper:  function  (a) {
		    stopEach = true;
		    arrSystems = [];
	        arrMethods = [];

		    $.each(upperLevel, function(i){
			    $.each(upperLevel[i].methods, function(j){

				    if (a == "load") {
					    var curr = upperLevel[i].methods[j].currencies;
					    app.eachCurr (curr);
				    } else if (a=="#currency") {
					    var sys = upperLevel[i],
					    	meth = sys.methods[j];
					    app.eachSys ( sys, meth );
				    } else if (a == "#system"){

					    if(upperLevel[i].id==$('#system').val()){
						    var meth = upperLevel[i].methods[j];
						    app.eachMeth (meth);
					    }
				    }
				    return stopEach
			    })
		    })
    	},

		eachCurr : function (curr) {

			$.each(curr, function(k){
				var c = $.inArray(curr[k], arrCurrencies);

				if(c<0){
					arrCurrencies.push(curr[k]);
					app.optionAdd ( curr[k] , curr[k] , '#currency' );
				}
			})
		},

		eachMeth : function (meth) {

			$.each( meth.currencies , function(k){
				var c = $.inArray(meth.name, arrSystems);

				if(meth.currencies[k]==$('#currency').val()&&c<0){
					arrSystems.push(meth.name);
					app.optionAdd( meth.id , meth.name , '#method');
					return false
				}
			})   
		},

		eachSys : function (sys , meth) {

			$.each(meth.currencies, function(k){
				stopEach=true;
				var c = $.inArray(sys.id, arrMethods);

				if(meth.currencies[k]==$('#currency').val()&&c<0){
					stopEach=false;
					arrMethods.push(sys.id);
					app.optionAdd( sys.id , sys.name , '#system')
					return false
				}
			})
		},

		disabled : function (id,idButton) {
			$(id).prop("disabled", true);
			$(idButton).addClass("dis");
		},

		active : function (id,idButton) {
			$(id).prop("disabled", false);
			$(idButton).removeClass("dis");
		},

		rem : function (x) {
			$('option', $(x)).not('.d_none').remove();
		},

      	optionAdd : function  ( a , b , id ) {
	        var addOption = '<option value=' + a + '>' + b + '</option>';
	        $(id).append(addOption);        
      	},

      	openSelect : function (classButto) {
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('mousedown');
			$('select')[0].dispatchEvent(e);
      	},

      	reset : function () {
      		way = true;
			part = true;
			app.rem('#method');
			app.rem('#system');
			app.rem('#currency');
			app.disabled ("#method","#caretMethod");
			app.active("#currency","#caretCurrency");			
			arrSystems = [];
			arrMethods = [];
			arrCurrencies = [];
			app.add(upperLevel,'#system');
			app.eachWrapper ('load');
      	},

      	wayFalse : function () {
      		way = false;
      	}


	
	}

	app.initialize();


	    
	$("#system").change(function() {

		if(way){
			app.rem('#method');
			app.rem('#currency');
			app.active ('#method',"#caretMethod");
			app.disabled ("#currency","#caretCurrency");
			app.searchiInSystems();
		} else if(!way){
			app.active ('#method',"#caretMethod");
			app.rem('#method');
			app.eachWrapper ('#system');
		}
	});



	$("#method").change(function() {

		if (way) {
			app.rem('#currency');
			app.active ('#currency',"#caretCurrency");
			app.searchiInMethods();
		};
	});


	$("#currency").change(function() {

		if (!way||part) {
			app.disabled ("#method","#caretMethod");
			app.wayFalse ();
			app.rem('#method');
			app.rem('#system');
			app.eachWrapper ('#currency');
		}
	});

	$('.caretImg').click(function () {
		var e = document.createEvent('MouseEvents');
	    e.initMouseEvent('mousedown');
	    if (this.id=="caretSystem") {
	    	$('#system')[0].dispatchEvent(e);
	    }else if (this.id=="caretMethod") {
	    	$('#method')[0].dispatchEvent(e);
	    }else if (this.id=="caretCurrency") {
	    	$('#currency')[0].dispatchEvent(e);
	    }
	    
	})

	$('#reset').click(function () {
		app.reset();
	})
	
}());