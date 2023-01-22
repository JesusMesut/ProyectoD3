const diCaprioBirthYear = 1974;

const age = function (year) {
  return year - diCaprioBirthYear
}

const today = new Date().getFullYear()
const ageToday = age(today)

//console.log(ageToday)

// ----------------------------------------------------------

//márgenes
const width = 800
const height = 500
const margin = { top: 0.5, bottom: 80, right: 10, left: 80 }

//agrupaciones
const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

//escalas
const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

//ejes
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

//fichero
d3.csv("data.csv").then(data => {
  console.log(data)
  data.map(d => {
    d.age = +d.age
    d.year = +d.year
  })

  //dominios
  x.domain(data.map(d => d.year))
  y.domain([0, ageToday])


  //llamada ejes
  xAxisGroup.call(xAxis).attr("font-size", "12").attr("font-weight", "bold")
  yAxisGroup.call(yAxis).attr("font-size", "12").attr("font-weight", "bold")

  //data binding parejas
  let elements = elementGroup.selectAll("rect").data(data)
  elements.enter().append("rect")
    .attr("class", "parejas")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.age))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.top - margin.bottom - y(d.age))


  //data binding ldc
  let line = d3.line().x(d => x(d.year) + (x.bandwidth() / 2)).y(d => y(age(d.year)))
  elementGroup.datum(data)
    .append("path")
    .attr("id", "line")
    .attr("d", line)



  //data binding tope edad
  let line1 = d3.line().x(d => x(d.year) + (x.bandwidth() / 2)).y(d => y(d.age = 25))
  elementGroup.datum(data)
    .append("path")
    .attr("id", "line1")
    .attr("d", line1)

  //titulo
  elementGroup.append("text").text("LDC & PAREJAS").attr("x", 300).attr("y", 470).attr("class", "negrita")


})


