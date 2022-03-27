import { SocketService } from "./SocketService";
import Paper from "paper";

export class PaperService extends SocketService {
    paper: Object;
    tool: any;
    color: any;
    strokeWidth: any;
    path: any;

    constructor(socketService) {
        super(socketService);

        this.socket = socketService.socket;
        this.paper = {};
    }
    
    initPaper(canvasId) {
        this.paper["projects"] = [];
        Paper.setup(canvasId);
        this.tool = new Paper.Tool();
    }
    
    clearProject() {
        Paper.project.clear();
        this.socket.emit('drawing:clear');
    }
    
    isDrawer() {
        return super.toObservable('drawing:drawer');
    }
    
    reset() {
        this.tool.remove();
    }
    
    subscribeEvent() {
        this.socket.on('drawing:mouseDown', (data) => {
          this.processMouseDown(data);
        });
        this.socket.on('drawing:mouseDrag', (data) => {
          this.processDrawing(data);
        });
        this.socket.on('drawing:load', (data) => {
          this.loadProject(data);
        });
        this.socket.on('drawing:clear', () => {
          Paper.project.clear();
        });
        this.socket.on('drawing:brushChange', (brush) => {
          this.color = brush.color;
          this.strokeWidth = brush.width;
        });
    }
    
    enableDrawing() {
        this.tool.minDistance = 10;
        this.tool.on('mousedown', this.onMouseDown);
        this.tool.on('mousedrag', this.onMouseDrag);
    }
    
    eraser() {
        this.color = '#FFFFFF';
        this.strokeWidth = 30;
        this.brushChange();
    }
    
    pencil() {
        this.color = '#000000';
        this.strokeWidth = 3;
        this.brushChange();
    }
    
    brushChange() {
        this.socket.emit('drawing:brushChange', { color: this.color, width: this.strokeWidth });
    }
    
    onMouseDown = (event) => {
        // Create a new path every time the mouse is clicked
        this.setPath(event);
        this.socket.emit('drawing:mouseDown', event.point);
    };
    
    onMouseDrag = (event) => {
        // Add a point to the path every time the mouse is dragged
        this.path.add(event.point);
        this.path.smooth();
        this.socket.emit('drawing:mouseDrag', event.point);
    };
    
    processMouseDown(point) {
        let p = new Paper.Point(point[1], point[2]);
        this.setPath({point: p});
        // Paper.view.draw();
    } 

    processDrawing(point) {
        let p = new Paper.Point(point[1], point[2]);
        this.path.add(p);
        // Paper.view.draw();
    };
    
    setPath(event) {
        this.path = new Paper.Path();
        this.path.strokeColor = this.color;
        this.path.strokeWidth = this.strokeWidth;
        this.path.strokeCap = 'round';
        this.path.strokeJoin = 'round';
    
        this.path.add(event.point);
    }
    
    loadProject(projectJSON) {
        Paper.project.importJSON(projectJSON);
    }
}