import {
  MAX_ZOOM_LAYOUT_DATA,
  MIN_ZOOM_LAYOUT_DATA,
  MAX_ZOOM_HEADMAP
} from '../components/constants';
// generic
export const layoutStyleGeneral = {
  'icon-image': ['concat', ['get', 'amenity'], '-icon'],
  'icon-size': [
    'interpolate',
    ['linear'],
    ['zoom'],
    MIN_ZOOM_LAYOUT_DATA,
    0.11,
    MAX_ZOOM_LAYOUT_DATA,
    0.4
  ]
};

export const paintHeatmap = (layer_id) => {
  let heatmapColor;

  switch (layer_id) {
    case 'education':
      heatmapColor = [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(255, 255, 255, 0)',
        0.1,
        'rgba(255, 255, 255, 0.1)',
        0.3,
        'rgba(255, 255, 255, 0.3)',
        0.5,
        'rgba(255, 255, 255, 0.5)',
        0.7,
        'rgba(255, 255, 255, 0.7)',
        1,
        'rgba(255, 255, 255, 1)'
      ];
      break;
    case 'healthcare':
      heatmapColor = [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(199, 5, 5, 0)',
        0.1,
        '#c70505',
        0.3,
        '#ff6b6b',
        0.5,
        '#ff8c8c',
        0.7,
        '#ffafaf',
        1,
        '#ffd1d1'
      ];
      break;
    case 'transport':
      heatmapColor = [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0, 0, 255, 0)',
        0.1,
        '#0000ff',
        0.3,
        '#6b6bff',
        0.5,
        '#8c8cff',
        0.7,
        '#afafff',
        1,
        '#d1d1ff'
      ];
      break;
    default:
      heatmapColor = [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(255, 255, 255, 0)',
        1,
        'rgba(255, 255, 255, 1)'
      ];
  }

  return {
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 4, 0, MAX_ZOOM_HEADMAP, 1],
    'heatmap-color': heatmapColor,
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 4, 3, MAX_ZOOM_HEADMAP, 6],
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 4, 1, MAX_ZOOM_HEADMAP, 0.2]
  };
};

export const alphaRaster = {
  'raster-opacity': ['interpolate', ['linear'], ['zoom'], 3, 1, 16, 0.01]
};
