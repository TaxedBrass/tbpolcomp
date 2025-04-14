// Basic React app for the Philosophical Political Compass
import React, { useState } from "react";
import { Slider } from "./components/ui/slider";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Scatter } from "recharts";

const questions = [
  // Globalist ↔ Identitarian questions
  { text: "My ideals should apply to all people, regardless of who or where they are.", axis: "x", weight: 1 },
  { text: "I should not have to live among groups that I hate.", axis: "x", weight: -1 },
  { text: "Any truly good system would bring about good results for anyone.", axis: "x", weight: 1 },
  { text: "Not all cultures are equal.", axis: "x", weight: -1 },
  { text: "Universal morality exists and should be promoted.", axis: "x", weight: 1 },
  { text: "Cultural preservation is necessary for a society.", axis: "x", weight: -1 },
  { text: "My worldview has no state or private borders.", axis: "x", weight: 1 },
  { text: "If there is a democracy, immigrants should be allowed to participate.", axis: "x", weight: 1 },
  { text: "It’s healthy for groups to exclude others to maintain coherence.", axis: "x", weight: -1 },
  { text: "Traditions should be questioned if they don’t apply universally.", axis: "x", weight: 1 },
  { text: "It is good to have a strong in-group preference.", axis: "x", weight: -1 },
  { text: "Nations must abolish borders in favor of a larger global community.", axis: "x", weight: 1 },
  { text: "Multiculturalism is a scourge.", axis: "x", weight: -1 },
  { text: "It is morally wrong to place your own people above others.", axis: "x", weight: 1 },
  { text: "Diversity is our strength.", axis: "x", weight: 1 },
  { text: "I would rather domate to domestic charities than foreign ones.", axis: "x", weight: -1 },
  { text: "Religious or ethnic homogeneity is dangerous.", axis: "x", weight: 1 },
  { text: "Cultural preservation should be disregarded as bigotry.", axis: "x", weight: 1 },
  { text: "I should be able to exclude homosexuals, minorities, and other religious groups from my life.", axis: "x", weight: -1 },

  // Individualist ↔ Collectivist questions
  { text: "The individual should serve the group when necessary.", axis: "y", weight: 1 },
  { text: "Individual freedom is the highest political good.", axis: "y", weight: -1 },
  { text: "Property is theft.", axis: "y", weight: 1 },
  { text: "It's better for everyone to pull together than to pull alone.", axis: "y", weight: 1 },
  { text: "It's okay to sacrifice wealth for equality.", axis: "y", weight: 1 },
  { text: "You are responsible for yourself, not others.", axis: "y", weight: -1 },
  { text: "A unified community is more important than self-expression.", axis: "y", weight: 1 },
  { text: "No one knows what’s best for me better than me.", axis: "y", weight: -1 },
  { text: "Rights exist because they’re granted by the community.", axis: "y", weight: 1 },
  { text: "Protectionism is inherently a bad thing.", axis: "y", weight: -1 },
  { text: "Rights exist inherently and must be respected regardless of context.", axis: "y", weight: -1 },
  { text: "Socialism is inherently oppressive.", axis: "y", weight: 1 },
  { text: "Freedom is meaningless without order.", axis: "y", weight: 1 },
  { text: "No individual can truly own property.", axis: "y", weight: 1 },
  { text: "Profit should serve the people, not the individual.", axis: "y", weight: 1 },
  { text: "Order is meaningless without freedom.", axis: "y", weight: - 1 },
  { text: "The rich are inherently at least somewhat exploitative.", axis: "y", weight: 1 },
  { text: "You are obligated to act towards the greater good.", axis: "y", weight: 1 },
  { text: "The government should take control of industries in times of emergency, if it doesn't already control them.", axis: "y", weight: 1 },
  { text: "No individual can truly own property.", axis: "y", weight: 1 },
  { text: "Taxation is theft.", axis: "y", weight: -1 },
  { text: "You should be allowed to act however you want, so long as you don't aggress upon others.", axis: "y", weight: -1 },
  { text: "Altruism is evil.", axis: "y", weight: -1 },
  { text: "Pure capitalism is inherently exploitative.", axis: "y", weight: 1 },
  { text: "Nobody becomes rich without society's help.", axis: "y", weight: 1 },
  { text: "The will of the individual is more important than the collective interest.", axis: "y", weight: -1 },
];

const Compass = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    let x = 0;
    let y = 0;
  
    let maxX = 0;
    let maxY = 0;
  
    questions.forEach((q, i) => {
      const weight = q.weight;
      const response = responses[i];
  
      if (q.axis === "x") {
        x += weight * response;
        maxX += Math.abs(weight) * 2; // max possible is ±2 for each response
      }
      if (q.axis === "y") {
        y += weight * response;
        maxY += Math.abs(weight) * 2;
      }
    });
  
    // Normalize to range -10 to 10
    const normalizedX = maxX === 0 ? 0 : (x / maxX) * 10;
    const normalizedY = maxY === 0 ? 0 : (y / maxY) * 10;
  
    setResult({ x: normalizedX, y: normalizedY });
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h1 className="text-2xl font-bold mb-4">Brassy's Political Compass</h1>
      {result ? (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Your Position</h2>
            <ResponsiveContainer width={450} height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="number" dataKey="x" domain={[-10, 10]} label={{ value: "Globalist ←→ Identitarian", position: "insideBottom", offset: -10 }} />
                <YAxis type="number" dataKey="y" domain={[-10, 10]} label={{ value: "Individualist ←→ Collectivist", angle: -90, position: "outsideLeft", offset: 10, y: 20 }} />
                <ZAxis range={[100]} />
                <Scatter data={[result]} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
            <Button className="mt-4" onClick={() => setResult(null)}>Retake Test</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <p className="mb-2">{q.text}</p>
                <Slider min={-2} max={2} step={1} value={responses[i]} onValueChange={(val) => handleChange(i, val)} />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Disagree</span>
                  <span> ← → </span>
                  <span>Agree</span>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
};

export default Compass;