/*
 * Game Develop Core
 * Copyright 2008-2014 Florian Rival (Florian.Rival@gmail.com). All rights reserved.
 * This project is released under the GNU Lesser General Public License.
 */
#ifndef ResourcesUnmergingHelper_H
#define ResourcesUnmergingHelper_H

#include "GDCore/IDE/ArbitraryResourceWorker.h"
#include <string>

namespace gd
{

/**
 * \brief Helper used to regenerate resources filename from a "portable" game
 *
 * \see ArbitraryResourceWorker
 *
 * \ingroup IDE
 */
class GD_CORE_API ResourcesUnmergingHelper : public ArbitraryResourceWorker
{
public:
    ResourcesUnmergingHelper(std::string newDirectory_) : ArbitraryResourceWorker(), newDirectory(newDirectory_) {};
    virtual ~ResourcesUnmergingHelper() {};

    /**
     * ResourcesUnmergingHelper modify each resouce path.
     */
    virtual void ExposeFile(std::string & resource);

    virtual void ExposeImage(std::string & imageName) {};
    virtual void ExposeShader(std::string & shaderName) {};

private:
    std::string newDirectory;
};

}

#endif // ResourcesUnmergingHelper_H
