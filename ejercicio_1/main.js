//márgenes
const width = 800
const height = 400
const margin = { top: 50, bottom: 60, right: 10, left: 40 }

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
d3.csv("WorldCup.csv").then(data => {

//agrupacion datos fichero
  let nest = d3.nest()
    .key(d => d.Winner)
    .entries(data)

  //orden
  nest.sort(function (a, b) {
    return d3.descending(a.values, b.values)
  })
  //console.log(nest)

  //dominios
  x.domain(nest.map(d => d.key))
  y.domain([0, d3.max(nest.map(d => d.values.length))])

  //llamada ejes
  yAxis.ticks(y.domain()[1])
  xAxisGroup.call(xAxis).selectAll("text").attr("font-size","12").attr("font-weight" , "bold")
  yAxisGroup.call(yAxis).attr("font-size","12").attr("font-weight" , "bold")

  //data binding
  let elements = elementGroup.selectAll("rect").data(nest)
  elements.enter().append("rect")
    .attr("class", "paises")
    .attr("x", d => x(d.key))
    .attr("y", d => y(d.values.length))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.top - margin.bottom - y(d.values.length))

  //titulo
  elementGroup.append("text").text("MUNDIALES DE SELECCIONES")
  .attr("x", 300).attr("y", 340).attr("class", "negrita")

})

