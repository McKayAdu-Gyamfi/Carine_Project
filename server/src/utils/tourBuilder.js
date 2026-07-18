export const buildMarzipanoConfig = (panoramaUrl, sceneName, hotspots = []) => {
  return {
    "settings": {
      "mouseViewMode": "drag",
      "autorotateEnabled": true,
      "fullscreenButton": true,
      "viewControlButtons": true
    },
    "scenes": [
      {
        "id": "scene_" + Date.now(),
        "name": sceneName,
        "levels": [
          {
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
          },
          {
            "tileSize": 512,
            "size": 512
          }
        ],
        "faceSize": 1024,
        "initialViewParameters": {
          "pitch": 0,
          "yaw": 0,
          "fov": 1.0471975511965976
        },
        "linkHotspots": hotspots.map(h => ({
          "yaw": h.yaw,
          "pitch": h.pitch,
          "rotation": 0,
          "target": h.target_scene_id
        })),
        "infoHotspots": [],
        "panoramaUrl": panoramaUrl
      }
    ]
  };
};
