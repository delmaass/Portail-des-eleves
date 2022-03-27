import { useEffect } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import "../pictionary.css";

export const Canvas = ({paperService, isDrawer, ...props}) => {
    const clearPaper = () => {
        paperService.clearProject();
    }

    const useEraser = () => {
        paperService.eraser();
    }

    const usePencil = () => {
        paperService.pencil();
    }

    useEffect(() => {
        paperService.initPaper("canvas");
        paperService.subscribeEvent();
        if(isDrawer) {
            paperService.enableDrawing();
        }
        
        return () => {
            paperService.reset();
        }
    })

    return (
        <div>
            <canvas {...props} id="canvas" />
            { isDrawer ? (
                <div className="d-flex gap-2 w-100">
                    <Button variant="danger" onClick={clearPaper}>Tout effacer</Button>
                    <Button variant="secondary" onClick={useEraser}>Gomme</Button>
                    <Button variant="primary" onClick={usePencil}>Crayon</Button>
                </div>
            ) : "" }
        </div>
    )
}