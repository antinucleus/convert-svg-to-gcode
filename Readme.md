# CONVERT SVG TO GCODE

## Introduction

_Aim of the this project is converting svg file to gcode file._

I did research for repos that convert to svg gcode. I tried some repos, but these repos weren't working properly. Some of them never worked, some of them worked, but the generated gcode had nothing to do with the original svg, so it was broken. Then I tried to understand how svg and gcode work. I came across a site that describes svg very well [svg-path-visualizer](https://svg-path-visualizer.netlify.app/) . By studying the examples here, after understanding how svg works, I started writing this repo that converts to gcode.

Currently, this repository converts movement, line, horizontal line, vertical line, cubic bezier curve, smooth cubic bezier curve, quadratic bezier curve, and smooth quadratic bezier curve commands, both absolute and relative, to gcode. I will make this repo capable of processing all the svg commands used for the path element. Later, I will add the codes that convert the tags used specifically for the shapes to gcode.

You can see the to-do list and how to use this repo below.

## Usage

1. This project was written in the typescript language. Therefore, it requires `tsc` (typescript compiler) for compilation. To install it globally run this command
   `npm install -g tsc`

2. Clone the repository
   `git clone https://github.com/antinucleus/convert-svg-to-gcode.git`

3. Change directory to repository folder
   `cd convert-svg-to-gcode`

4. Copy the SVG file you want to convert to `convert-svg-to-gcode/src/public` directory. If the file is not there, program will not work.

5. There is `config.json` file at /src directory of the project. You can change the values for your needs. Config file fields listed below:

   - `svgFileName`: A file name which will be converted to gcode. File must be in public directory as described above. If it is not there, program will not work.
   - `initialCommand`: You can change initial command if it is neccessary or you can additional command to array.
   - `lineNumbering`: If it is true, line numbers will be added for each gcode command.
   - `sampleCount`: This value determines how curves will be smooth. Higher values provide smoothier curves but gcode generation takes longer time. If negative value is supplied, default value `30` will be taken.

6. Install node_modules `npm install`

7. Run this command `npm run start`

8. If there is no error `output.gcode` file will be found at root directory.

9. You can test `output.gcode` file at [https://ncviewer.com/](ncviewer).

## NOTES

### Currently, this repository converts movement, line, horizontal line, vertical line, cubic bezier curve, smooth cubic bezier curve, quadratic bezier curve, and smooth quadratic bezier curve commands, both absolute and relative, to gcode.You can check to-do list. If your svg file includes different path or shape command it will not work.

### Unit conversion will be supported later.

### There is no conversion of digital units to pyhsical units yet. Therefore, drawing will be huge.

## Examples

You can check examples folder. `output.gcode` files in this directory are generated from svg file. These `output.gcode` files are tested at [ncviewer](https://ncviewer.com/) and result photos are added.

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image0/result.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image1/result.png" width="400"/>   
</div>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image2/result.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image3/result.png" width="400"/>   
</div>

<div style="display:flex;" align="center">
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image4/result.png" width="400"/>   
   &nbsp;&nbsp;&nbsp;
   <img src="https://github.com/antinucleus/convert-svg-to-gcode/blob/main/examples/image5/result.png" width="400"/>   
</div>

</div>

## To-Do List

- [ ] Convert digital units (px,pt...) to pyhsical units(mm,inch...)
- [ ] Add feed rate control

> #### Paths

##### Line Commands

- [x] Support conversion of `M` command (Absolute Move To)
- [x] Support conversion of `m` command (Relative Move To)
- [x] Support conversion of `L` command (Absolute Line To)
- [x] Support conversion of `l` command (Relative Line To)
- [x] Support conversion of `H` command (Absolute Horizontal Line To)
- [x] Support conversion of `h` command (Relative Horizontal Line To)
- [x] Support conversion of `V` command (Absolute Vertical Line To)
- [x] Support conversion of `v` command (Relative Vertical Line To)
- [x] Support conversion of `Z` command (Close Path)
- [x] Support conversion of `z` command (Close Path)

##### Curve Commands

- [x] Support conversion of `C` command (Absolute Cubic Bezier Curve To)
- [x] Support conversion of `c` command (Relative Cubic Bezier Curve To)
- [x] Support conversion of `S` command (Absolute Smooth Cubic Bezier Curve To)
- [x] Support conversion of `s` command (Relative Smooth Cubic Bezier Curve To )
- [x] Support conversion of `Q` command (Absolute Quadratic Bezier Curve To)
- [x] Support conversion of `q` command (Relative Quadratic Bezier Curve To)
- [x] Support conversion of `T` command (Absolute Smooth Quadratic Bezier Curve To)
- [x] Support conversion of `t` command (Relative Smooth Quadratic Bezier Curve To)
- [ ] Support conversion of `A` command (Absolute Elliptical Arc To)
- [ ] Support conversion of `a` command (Relative Elliptical Arc To)

> #### Basic Shapes

- [ ] Rect Element
- [ ] Circle Element
- [ ] Ellipse Element
- [ ] Line Element
- [ ] Polyline Element
- [ ] Polygon Element
