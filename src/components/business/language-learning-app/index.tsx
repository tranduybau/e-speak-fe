'use client'

import { useState } from 'react'
import {
  BarChart2,
  BookmarkPlus,
  History,
  LogIn,
  Mic,
  Play,
  Search,
  Trophy,
  Volume2,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LanguageLearningApp() {
  const [score] = useState(0)
  const [pronunciation] = useState(0)

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Language Learning App</h1>
        <Button variant="outline">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </header>

      <Tabs defaultValue="practice" className="mb-6">
        <TabsList>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="dictation">Dictation</TabsTrigger>
          <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
          <TabsTrigger value="phrases">Phrases</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Pronunciation</CardTitle>
              <CardDescription>Read the text and practice your pronunciation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">Read this sentence:</h3>
                <p className="mb-2 text-xl">The quick brown fox jumps over the lazy dog.\</p>
                <p className="text-muted-foreground mb-4 text-sm">
                  /ðə kwɪk braʊn fɒks dʒʌmps ˈəʊvə ðə ˈleɪzi dɒɡ/
                </p>
                <Button className="mr-2">
                  <Volume2 className="mr-2 h-4 w-4" /> Listen
                </Button>
                <Button>
                  <Mic className="mr-2 h-4 w-4" /> Record
                </Button>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Your pronunciation score:</h4>
                <Progress value={pronunciation} className="w-full" />
                <p className="text-muted-foreground mt-2 text-sm">
                  Keep practicing to improve your score!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dictation">
          <Card>
            <CardHeader>
              <CardTitle>Dictation Exercise</CardTitle>
              <CardDescription>Listen to the audio and fill in the missing words</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>
                  <Play className="mr-2 h-4 w-4" /> Play Audio
                </Button>
              </div>
              <div className="mb-4">
                <p>
                  The <Input className="mx-1 inline-block w-24" placeholder="..." /> is one of the
                  most <Input className="mx-1 inline-block w-24" placeholder="..." /> animals in the
                  world.
                </p>
              </div>
              <Button>Submit</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dictionary">
          <Card>
            <CardHeader>
              <CardTitle>Dictionary</CardTitle>
              <CardDescription>Look up words and save them for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex">
                <Input placeholder="Search for a word" className="mr-2" />
                <Button>
                  <Search className="mr-2 h-4 w-4" /> Look Up
                </Button>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Recent Searches:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Eloquent</span>
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Perseverance</span>
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phrases">
          <Card>
            <CardHeader>
              <CardTitle>Common Phrases</CardTitle>
              <CardDescription>Learn everyday communication phrases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
                  <Play className="h-12 w-12" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">How to greet someone</h4>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Hello, how are you? - A common greeting in English.
                  </p>
                  <Button variant="outline" size="sm">
                    Next Phrase
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Total Score</h4>
                  <p className="text-2xl font-bold">{score}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Rank</h4>
                  <Badge variant="secondary" className="text-xl">
                    #42
                  </Badge>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <History className="mr-2 h-4 w-4" /> Learning History
                </Button>
                <Button variant="outline">
                  <Trophy className="mr-2 h-4 w-4" /> Achievements
                </Button>
                <Button variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" /> Statistics
                </Button>
                <Button variant="outline">Leaderboard</Button>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Keep up the good work!</p>
                  <p className="text-muted-foreground text-sm">You re making great progress.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
