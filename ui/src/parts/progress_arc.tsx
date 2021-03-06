// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import * as d3 from 'd3'
import React from 'react'
import { F, S, U } from '../qd'

interface Props {
  thickness: U
  color: S
  value: F
}

export const ProgressArc = ({ thickness, color, value }: Props) => {
  const
    ref = React.useRef<SVGSVGElement>(null),
    [SVGContent, setSVGContent] = React.useState<JSX.Element | null>(null)

  React.useLayoutEffect(() => {
    const
      width = ref.current?.clientWidth!,
      height = ref.current?.clientHeight!,
      size = Math.min(width, height),
      outerRadius = size / 2,
      innerRadius = size / 2 - thickness,
      slot = d3.arc()({
        outerRadius,
        innerRadius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
      }),
      bar = d3.arc()({
        outerRadius,
        innerRadius,
        startAngle: 0,
        endAngle: 2 * Math.PI * value,
      })
    setSVGContent((
      <g transform={size === height ? `translate(${(width - (2 * outerRadius)) / 2}, 0)` : `translate(0, ${(height - (2 * outerRadius)) / 2})`}>
        <path d={slot as S} fill={color} fillOpacity={0.15} transform={`translate(${outerRadius},${outerRadius})`} />
        <path d={bar as S} fill={color} transform={`translate(${outerRadius},${outerRadius})`} />
      </g>
    ))
  }, [thickness, color, value])

  return <svg ref={ref} width='100%' height='100%'>{SVGContent}</svg>
}