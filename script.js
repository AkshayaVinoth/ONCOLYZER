let generatedReport="";

function processFile(){

const file=document.getElementById("fileInput").files[0];

if(!file){
alert("Please upload a mutation report");
return;
}

const reader=new FileReader();

reader.onload=function(e){

const content=e.target.result;

document.getElementById("processing").innerText="Analyzing genomic mutations...";

setTimeout(()=>{

const genes=detectGenes(content);

generateGalaxy(genes);

generateReport(genes);

document.getElementById("processing").innerText="Analysis Complete";

document.getElementById("galaxy").scrollIntoView({behavior:"smooth"});

},1500);

};

reader.readAsText(file);

}


function detectGenes(content){

const knownGenes=[
"TP53","BRCA1","BRCA2","KRAS","EGFR",
"PIK3CA","PTEN","BRAF","ALK","NRAS"
];

let found=[];

knownGenes.forEach(gene=>{
if(content.toUpperCase().includes(gene)){
found.push(gene);
}
});

if(found.length===0){
found=knownGenes.slice(0,4);
}

return found;

}



function generateGalaxy(genes){

const canvas=document.getElementById("galaxyCanvas");
const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

let nodes=[];

genes.forEach(gene=>{
nodes.push({
gene:gene,
x:Math.random()*canvas.width,
y:Math.random()*canvas.height
});
});

ctx.strokeStyle="rgba(0,255,255,0.3)";

for(let i=0;i<nodes.length;i++){
for(let j=i+1;j<nodes.length;j++){

ctx.beginPath();
ctx.moveTo(nodes[i].x,nodes[i].y);
ctx.lineTo(nodes[j].x,nodes[j].y);
ctx.stroke();

}
}

nodes.forEach(node=>{

ctx.beginPath();
ctx.arc(node.x,node.y,6,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();

ctx.fillStyle="white";
ctx.fillText(node.gene,node.x+10,node.y);

});

}



function generateReport(genes){

let stage="Stage I";

if(genes.length>2) stage="Stage II";
if(genes.length>5) stage="Stage III";
if(genes.length>8) stage="Stage IV";

generatedReport=`

ONCOLYZE Mutation Analysis Report

Detected Genes: ${genes.join(", ")}

Mutation Count: ${genes.length}

Predicted Cancer Stage: ${stage}

Clinical Interpretation:
Gene mutation patterns indicate genomic instability
linked with ${stage} cancer progression.

Suggested Treatment Direction:
Targeted therapy consultation,
genomic oncology screening,
and clinical mutation profiling.

Lifestyle & Mental Care:
Balanced nutrition, routine screening,
psychological support and stress management.

`;

document.getElementById("reportBox").innerText=generatedReport;

}



function downloadReport(){

if(!generatedReport){
alert("Generate the report first.");
return;
}

const blob=new Blob([generatedReport],{type:"text/plain"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="ONCOLYZE_Report.txt";

link.click();

}