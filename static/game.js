class MarsGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentMap = 'viking1200.jpg';
        this.mapImage = new Image();
        this.plantCount = 0;
        this.resources = 100;
        this.plants = [];
        this.cursorPos = { x: 0, y: 0 };
        this.robotMode = 'none';
        
        this.init();
    }
    
    init() {
        this.loadMap();
        this.setupEventListeners();
        this.animate();
    }
    
    loadMap() {
        this.mapImage.onload = () => {
            this.render();
        };
        this.mapImage.src = `/maps/${this.currentMap}`;
    }
    
    setupEventListeners() {
        document.getElementById('mapSelect').addEventListener('change', (e) => {
            this.currentMap = e.target.value;
            this.loadMap();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.cursorPos.x = e.clientX - rect.left;
            this.cursorPos.y = e.clientY - rect.top;
            this.updatePositionDisplay();
        });
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.handleCanvasClick(x, y);
        });
        
        document.getElementById('plantBtn').addEventListener('click', () => {
            this.robotMode = 'plant';
            this.showDialog('Plant Mode', 'Click on the map to plant seeds. Cost: 10 resources per plant.');
        });
        
        document.getElementById('waterBtn').addEventListener('click', () => {
            this.robotMode = 'water';
            this.showDialog('Water Mode', 'Click on plants to water them. Cost: 5 resources per watering.');
        });
        
        document.getElementById('harvestBtn').addEventListener('click', () => {
            this.robotMode = 'harvest';
            this.showDialog('Harvest Mode', 'Click on mature plants to harvest. Gain: 20 resources per plant.');
        });
        
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeArea();
        });
        
        document.getElementById('dialogOk').addEventListener('click', () => {
            this.hideDialog();
        });
    }
    
    handleCanvasClick(x, y) {
        if (this.robotMode === 'plant') {
            if (this.resources >= 10) {
                this.plantSeed(x, y);
                this.resources -= 10;
                this.updateStats();
                this.showDialog('Success', 'Seed planted successfully!');
            } else {
                this.showDialog('Insufficient Resources', 'You need at least 10 resources to plant a seed.');
            }
            this.robotMode = 'none';
        } else if (this.robotMode === 'water') {
            const plant = this.findPlantAt(x, y);
            if (plant && this.resources >= 5) {
                plant.watered = true;
                plant.growth = Math.min(plant.growth + 0.3, 1.0);
                this.resources -= 5;
                this.updateStats();
                this.showDialog('Success', 'Plant watered!');
            } else if (!plant) {
                this.showDialog('No Plant', 'No plant found at this location.');
            } else {
                this.showDialog('Insufficient Resources', 'You need at least 5 resources to water.');
            }
            this.robotMode = 'none';
        } else if (this.robotMode === 'harvest') {
            const plant = this.findPlantAt(x, y);
            if (plant && plant.growth >= 1.0) {
                this.plants = this.plants.filter(p => p !== plant);
                this.plantCount--;
                this.resources += 20;
                this.updateStats();
                this.showDialog('Success', 'Plant harvested! +20 resources');
            } else if (plant) {
                this.showDialog('Not Ready', 'This plant is not mature enough to harvest yet.');
            } else {
                this.showDialog('No Plant', 'No plant found at this location.');
            }
            this.robotMode = 'none';
        }
    }
    
    plantSeed(x, y) {
        this.plants.push({
            x: x,
            y: y,
            growth: 0.2,
            watered: false,
            age: 0
        });
        this.plantCount++;
    }
    
    findPlantAt(x, y) {
        const radius = 15;
        return this.plants.find(plant => {
            const dx = plant.x - x;
            const dy = plant.y - y;
            return Math.sqrt(dx * dx + dy * dy) < radius;
        });
    }
    
    analyzeArea() {
        const analysis = {
            plants: this.plantCount,
            resources: this.resources,
            maturePlants: this.plants.filter(p => p.growth >= 1.0).length,
            youngPlants: this.plants.filter(p => p.growth < 1.0).length
        };
        
        this.showDialog('Area Analysis', 
            `Total Plants: ${analysis.plants}\n` +
            `Mature Plants: ${analysis.maturePlants}\n` +
            `Young Plants: ${analysis.youngPlants}\n` +
            `Resources: ${analysis.resources}`
        );
    }
    
    updatePositionDisplay() {
        document.getElementById('posDisplay').textContent = 
            `${Math.floor(this.cursorPos.x)}, ${Math.floor(this.cursorPos.y)}`;
    }
    
    updateStats() {
        document.getElementById('plantCount').textContent = this.plantCount;
        document.getElementById('resources').textContent = this.resources;
    }
    
    showDialog(title, text) {
        document.getElementById('dialogTitle').textContent = title;
        document.getElementById('dialogText').textContent = text;
        document.getElementById('dialogBox').classList.remove('hidden');
    }
    
    hideDialog() {
        document.getElementById('dialogBox').classList.add('hidden');
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.mapImage.complete) {
            this.ctx.drawImage(this.mapImage, 0, 0, this.canvas.width, this.canvas.height);
        }
        
        this.plants.forEach(plant => {
            this.drawPlant(plant);
        });
        
        if (this.robotMode !== 'none') {
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.cursorPos.x, this.cursorPos.y, 20, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    drawPlant(plant) {
        const size = 5 + (plant.growth * 10);
        const color = plant.growth >= 1.0 ? '#00ff00' : 
                     plant.growth >= 0.5 ? '#88ff00' : '#ffff00';
        
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(plant.x, plant.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        if (plant.watered) {
            this.ctx.strokeStyle = '#00ccff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(plant.x, plant.y, size + 3, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        this.ctx.fillStyle = '#006600';
        this.ctx.fillRect(plant.x - 2, plant.y + size, 4, size * 0.8);
    }
    
    update() {
        this.plants.forEach(plant => {
            plant.age++;
            if (plant.age % 180 === 0 && plant.growth < 1.0) {
                plant.growth = Math.min(plant.growth + 0.1, 1.0);
            }
            if (plant.age % 60 === 0) {
                plant.watered = false;
            }
        });
        
        if (this.plants.length > 0 && Math.random() < 0.01) {
            this.resources += 1;
            this.updateStats();
        }
    }
    
    animate() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new MarsGame();
});
