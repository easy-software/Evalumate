//code implementation inspiration from https://gist.github.com/jrue/a2aaf36b3c096925ccbf
//variables required for the wheel
var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            pickedOption = 100000, //this is the value that is selected when the spin button is clicked
            selectedOptions = [], //this stores all of the options that have been selected from previous spins
            color = d3.scale.ordinal()
            //this is the d3 function that assigns the 6 color values consistent
            // with the company color scheme to the wheel
  .domain(["Option 1", "Option 2", "Option 3","Option 4", "Option 5", "Option 6","Option 7", "Option 8", "Option 9","Option 10", "Option 11", "Option 12","Option 13", "Option 14", "Option 15","Option 16", "Option 17", "Option 18","Option 19", "Option 20", "Option 21","Option 22", "Option 23", "Option 24","Option 25", "Option 26", "Option 27","Option 28", "Option 29", "Option 30"])
  .range(["#fad654" , "#ffa309" , "#d97804", "#ed2937","#b4292e","#818185"]);
  //list of all of the options
        var ways_to_grow_data = [
                    {"label":"1", "option":" Invite someone to go ahead of you in line."},
                    {"label":"2", "option":" Compliment 3 People."},
                    {"label":"3", "option":" Acknowledge someone's contribution."},
                    {"label":"4", "option":" Meditate for 30 minutes."},
                    {"label":"5", "option":" Hold the door open for people."},
                    {"label":"6", "option":" Create a bucket list and share it."},
                    {"label":"7", "option":" Create a gratitude list and share it."},
                    {"label":"8", "option":" Ask an elder about his/her childhood."},
                    {"label":"9", "option":" De-clutter your environment and donate."},
                    {"label":"10", "option":" Treate a stranger to a coffee."},
                    {"label":"11", "option":" Share some wisdom with your younger self."},
                    {"label":"12", "option":" Give someone a handmade card/gift."},
                    {"label":"13", "option":" Share your Strive for 5 progress with a friend."},
                    {"label":"14", "option":" Listen to a personal growth podcast."},
                    {"label":"15", "option":" Stop using social media for today."},
                    {"label":"16", "option":" Share LovEd with someone who's struggling."},
                    {"label":"17", "option":" Watch a TED Talk on personal growth."},
                    {"label":"18", "option":" Have a date night with yourself."},
                    {"label":"19", "option":" Do something you enjoyed as a kid."},
                    {"label":"20", "option":" Write a letter to someone you admire."},
                    {"label":"21", "option":" Share something that people don't know about you."},
                    {"label":"22", "option":" List everyone you carry resentment for."},
                    {"label":"23", "option":" Write yourself a forgiveness letter."},
                    {"label":"24", "option":" Write an encouragement letter to your future self."},
                    {"label":"25", "option":" List what you've learned from past relationships."},
                    {"label":"26", "option":" Ask for feedback from someone."},
                    {"label":"27", "option":" Reach out to someone for advice."},
                    {"label":"28", "option":" Invite a negative person in your life to change."},
                    {"label":"29", "option":" Create a list of things you need to let go."},
                    {"label":"30", "option":" Apologize to someone."},
        ];
        //repeated the last 10 because the client wanted the last 10 to only be available after
        //20 total spins. They are repeated because the wheel is made using the dimensions of the first list
        var ways_to_grow_data_bold = [
                    {"label":"21", "option":" Share something that people don't know about you."},
                    {"label":"22", "option":" List everyone you carry resentment for."},
                    {"label":"23", "option":" Write yourself a forgiveness letter."},
                    {"label":"24", "option":" Write an encouragement letter to your future self."},
                    {"label":"25", "option":" List what you've learned from past relationships."},
                    {"label":"26", "option":" Ask for feedback from someone."},
                    {"label":"27", "option":" Reach out to someone for advice."},
                    {"label":"28", "option":" Invite a negative person in your life to change."},
                    {"label":"29", "option":" Create a list of things you need to let go."},
                    {"label":"30", "option":" Apologize to someone."},

        ];

        var spinCounter = 0; //how many spins in a day
        var currdate = new Date(); //current date
        var lastSpinDateMonth = -1; // this stores the month of the current date
        var lastSpinDateDay = -1; // this stores the date of the current date
        var lastSpinDateYear = -1; // this stores the year of the current date
        //console.log(date);

        //this is all d3 code for visualizing the wheel
        var svg = d3.select('#chart')
            .append("svg")
            .data([ways_to_grow_data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);

        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

        var vis = container
            .append("g");

        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");


        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });

        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return ways_to_grow_data[i].label;
            })
            .style({"font-weight":"bold", "font-size":"15px"});

        container.on("click", spinWheel);

        function spinWheel(d){ // this is the main functionality for the wheel - everything happens here

            container.on("click", null);
            //pull data from the controller and update the variables I created with this data
            var scope = angular.element($("#Ways2growsListController")).scope();
            console.log(scope + " this is the scope");

            if(scope.ways2grows === undefined || scope.ways2grows === null || scope.ways2grows.length === 0){
              selectedOptions = [];
            }
            else{ // this checks to see if the user has already clicked the spin wheel function once in the same day
              selectedOptions = scope.ways2grows[0].selectedOptions;
              // this assigns selected options to equal the options stored in the database
              if(scope.ways2grows[0].lastSpinDay===currdate.getDate() &&
              scope.ways2grows[0].lastSpinMonth==currdate.getMonth()+1 &&
              scope.ways2grows[0].lastSpinYear==currdate.getFullYear()){
                d3.select("#option h1")
                        .text("You have already spun once today!");
                return;
              }
            }
            console.log( " sup",selectedOptions);

            //this checks to see if the selected options array is full
            //if it is, it empties it and the challenge restarts
            if(selectedOptions.length == ways_to_grow_data.length){
                selectedOptions = [];
                spinCounter = 0;
            }
            //assign spincounter to equal the length of the selectied options list
            spinCounter = selectedOptions.length;

            if(spinCounter<=20)
                 var  ps = 360/30;
             else
                var  ps = 360/30;

            var rng  = Math.floor((Math.random() * 1440) + 360);
            rotation = (Math.round(rng / ps) * ps);
            //this is the logic based on how many spins have been done
            //if less than 20, the option that can be selected must be less than 21
            //if 20 or more, the option must be more than 20
            if(spinCounter<20){
            pickedOption = Math.round(ways_to_grow_data.length - (rotation % 360)/ps);
            var oldPickedOption= pickedOption
            console.log(pickedOption+"beforeunder20");
            pickedOption = pickedOption >= ways_to_grow_data.length-10 ? (pickedOption % (ways_to_grow_data.length-10)) : pickedOption;
            console.log(pickedOption+"afterunder20");
            if(pickedOption!=oldPickedOption){
                rotation = rotation - (ps*10);
                //console.log(rotation+"alteredrotation");
            }

            }
            else{
            pickedOption = Math.round(ways_to_grow_data.length - (rotation % 360)/ps);
            console.log(pickedOption+"beforenormal");
            pickedOption = pickedOption >= ways_to_grow_data.length ? (pickedOption % ways_to_grow_data.length) : pickedOption;
            console.log(pickedOption+"afternormal");
            }

            //checks if the option is already in the selected options list
            if(selectedOptions.indexOf(pickedOption) !== -1){
                d3.select(this).call(spinWheel);
                //spinCounter++;
                //console.log(spinCounter);
                return;
            } else {
                selectedOptions.push(pickedOption);
                spinCounter++;
                //date = new Date();
                lastSpinDateMonth = currdate.getMonth()+1;
                lastSpinDateDay = currdate.getDate();
                lastSpinDateYear = currdate.getFullYear();
                console.log(spinCounter);
            }

            rotation += 90 - Math.round(ps/2);
            //console.log(rotation+"newrotation");

            var dataPick = "";
            //datapick the value associated with each number
            if(spinCounter >20)
                dataPick = ways_to_grow_data_bold[pickedOption-20].option;
            else
                dataPick = ways_to_grow_data[pickedOption].option;


            vis.transition()
                .duration(3000)
                .attrTween("transform", rotateWheel)
                .each("end", function(){
                    d3.select("#option h1")// display the information in the option div
                        .text(dataPick);
                    oldrotation = rotation;
                    //store the updated information in the database
                    scope.$apply(function(){
                      if(scope.ways2grows === null || scope.ways2grows === undefined || scope.ways2grows.length === 0){
                      scope.create(selectedOptions, lastSpinDateDay, lastSpinDateMonth, lastSpinDateYear);
                    }else{
                      console.log("updating",scope.ways2growId);
                      scope.ways2grows[0].lastSpinDay = lastSpinDateDay;
                      scope.ways2grows[0].lastSpinMonth = lastSpinDateMonth;
                      scope.ways2grows[0].lastSpinYear = lastSpinDateYear;
                      scope.ways2grows[0].selectedOptions = selectedOptions;
                      scope.update();
                    }
                    });

                    container.on("click", spinWheel);
                });

        }
        //this is more d3 code for visualization and rotation - making the wheel rotate on spin
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});

        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 50)
            .style({"fill":"white","cursor":"pointer"});

        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px"});

        function rotateWheel(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
