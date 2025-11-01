# Mars Farming - Web Version

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python3 app.py
```

3. Open your browser and navigate to:
```
http://localhost:5000
```

## How to Play

### Controls
- **Map Layers**: Switch between different Mars map views (Viking, Topography, Geology, etc.)
- **Plant Seeds**: Click button, then click on map to plant (costs 10 resources)
- **Water**: Click button, then click on plants to water them (costs 5 resources)
- **Harvest**: Click button, then click mature (green) plants to harvest (gain 20 resources)
- **Analyze Soil**: Get statistics about your farming operation

### Game Mechanics
- Plants grow over time (yellow → light green → green)
- Watering plants speeds up growth
- Harvest mature plants for resources
- Plants generate passive resources over time
- Track your position, plant count, and resources in the side panel

### Visual Indicators
- **Yellow plants**: Young/newly planted
- **Light green plants**: Growing
- **Green plants**: Mature and ready to harvest
- **Blue ring**: Recently watered plant
- **Green cursor ring**: Active robot mode

Enjoy farming on Mars!
