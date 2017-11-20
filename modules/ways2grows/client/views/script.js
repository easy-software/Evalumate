//code implementation inspiration from https://gist.github.com/jrue/a2aaf36b3c096925ccbf
var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            pickedOption = 100000,
            selectedOptions = [],
            color = d3.scale.ordinal()
  .domain(["Option 1", "Option 2", "Option 3","Option 4", "Option 5", "Option 6","Option 7", "Option 8", "Option 9","Option 10", "Option 11", "Option 12","Option 13", "Option 14", "Option 15","Option 16", "Option 17", "Option 18","Option 19", "Option 20", "Option 21","Option 22", "Option 23", "Option 24","Option 25", "Option 26", "Option 27","Option 28", "Option 29", "Option 30"])
  .range(["#fad654" , "#ffa309" , "#d97804", "#ed2937","#b4292e","#818185"]);
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

        var spinCounter = 0;
        var date = new Date();
        var lastSpinDateMonth = -1;
        var lastSpinDateDay = -1;
        //console.log(date);

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


        function spinWheel(d){

            container.on("click", null);

            if(selectedOptions.length == ways_to_grow_data.length){
                /*selectedOptions = [];
                spinCounter = 0;*/
                d3.select("#option h1")
                        .text("All options have been selected!");
                return;
            }

            /*if(lastSpinDateMonth == date.getMonth()+1 && lastSpinDateDay == date.getDate()){
                d3.select("#option h1")
                        .text("You have already spun once today!");
                return;
            }*/

            if(spinCounter<=20)
                 var  ps = 360/30;
             else
                var  ps = 360/30;

            var rng  = Math.floor((Math.random() * 1440) + 360);
            rotation = (Math.round(rng / ps) * ps);
            //console.log(rotation+"rotation");
            //pickedOption = Math.round(ways_to_grow_data.length - (rotation % 360)/ps);
            //pickedOption = pickedOption >= ways_to_grow_data.length ? (pickedOption % ways_to_grow_data.length) : pickedOption;

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

            //pickedOption = Math.round(ways_to_grow_data.length - (rotation % 360)/ps);
            //console.log(pickedOption + "before");
            //pickedOption = ((pickedOption >= ways_to_grow_data.length &&spinCounter>20) || (pickedOption >= ways_to_grow_data.length-10 &&spinCounter<21)) ? (pickedOption % ways_to_grow_data.length) : pickedOption;
            //console.log(pickedOption + "after");
            //console.log(pickedOption);
            if(selectedOptions.indexOf(pickedOption) !== -1){
                d3.select(this).call(spinWheel);
                //spinCounter++;
                //console.log(spinCounter);
                return;
            } else {
                selectedOptions.push(pickedOption);
                spinCounter++;
                //date = new Date();
                lastSpinDateMonth = date.getMonth()+1;
                lastSpinDateDay = date.getDate();
                console.log(spinCounter);
            }

            rotation += 90 - Math.round(ps/2);
            //console.log(rotation+"newrotation");

            var dataPick = "";

            if(spinCounter >20)
                dataPick = ways_to_grow_data_bold[pickedOption-20].option;
            else
                dataPick = ways_to_grow_data[pickedOption].option;


            vis.transition()
                .duration(3000)
                .attrTween("transform", rotateWheel)
                .each("end", function(){
                    d3.select("#option h1")
                        .text(dataPick);
                    oldrotation = rotation;
                    container.on("click", spinWheel);
                });
        }
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
